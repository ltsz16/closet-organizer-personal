import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCleaningData, getRoom } from '@/api'

export const useCleaningStore = defineStore('cleaning', () => {
  const rooms = ref([])
  const currentRoom = ref(null)
  const checklist = ref(null) // Flattened items for ChecklistView
  const completions = ref({}) // Store completions per room
  const loading = ref(false)
  const error = ref(null)

  // Load/save completions from localStorage
  function getStoredCompletions(roomId) {
    const stored = localStorage.getItem(`cleaning_${roomId}`)
    return stored ? JSON.parse(stored) : {}
  }

  function saveCompletions(roomId, completionMap) {
    localStorage.setItem(`cleaning_${roomId}`, JSON.stringify(completionMap))
    completions.value[roomId] = completionMap
  }

  async function fetchRooms() {
    loading.value = true
    error.value = null
    try {
      const data = await getCleaningData()
      rooms.value = data.rooms || []
    } catch (e) {
      error.value = e.message
      console.error('Failed to fetch cleaning data:', e)
      rooms.value = []
    } finally {
      loading.value = false
    }
  }

  async function fetchChecklist(roomId) {
    loading.value = true
    error.value = null
    try {
      const room = await getRoom(roomId)
      if (!room) {
        throw new Error(`Room ${roomId} not found`)
      }

      // Flatten categories and items into a single list
      const items = []
      for (const category of room.categories || []) {
        for (const item of category.items || []) {
          items.push({
            item_key: item.key,
            description: item.description,
            frequency: item.frequency,
            category: category.category,
            sortOrder: item.sortOrder,
          })
        }
      }

      // Load saved completions for this room
      const completionMap = getStoredCompletions(roomId)
      const completions_array = Object.entries(completionMap).map(([item_key, completed]) => ({
        item_key,
        completed,
      }))

      checklist.value = {
        items,
        completions: completions_array,
        session_token: roomId,
      }

      currentRoom.value = room
      completions.value[roomId] = completionMap
    } catch (e) {
      error.value = e.message
      console.error('Failed to fetch checklist:', e)
      checklist.value = null
    } finally {
      loading.value = false
    }
  }

  async function toggleItem(roomId, itemKey, currentCompleted) {
    if (!completions.value[roomId]) {
      completions.value[roomId] = {}
    }
    const newCompleted = !currentCompleted
    completions.value[roomId][itemKey] = newCompleted
    saveCompletions(roomId, completions.value[roomId])

    // Update checklist ref
    if (checklist.value) {
      const completion = checklist.value.completions.find((c) => c.item_key === itemKey)
      if (completion) {
        completion.completed = newCompleted
      }
    }
  }

  async function resetChecklist(roomId) {
    completions.value[roomId] = {}
    localStorage.removeItem(`cleaning_${roomId}`)

    // Clear all completions in checklist
    if (checklist.value) {
      checklist.value.completions = []
    }
  }

  function isItemCompleted(roomId, itemKey) {
    return completions.value[roomId]?.[itemKey] || false
  }

  return {
    rooms,
    currentRoom,
    checklist,
    completions,
    loading,
    error,
    fetchRooms,
    fetchChecklist,
    toggleItem,
    resetChecklist,
    isItemCompleted,
  }
})
