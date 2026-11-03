# Closet Setup Guide

This guide explains how to add, edit, and organize closets, shelves, and baskets in your Closet Organizer app.

## Quick Start

All closet data is stored in **`data/json/closets.json`**. To add or modify closets:

1. Open [`data/json/closets.json`](./data/json/closets.json) in a text editor
2. Add/edit closets, shelves, and baskets (see examples below)
3. Commit and push to GitHub
4. Site automatically redeploys in ~1-2 minutes
5. Hard refresh your browser to see changes

---

## File Structure

### Top-level structure:
```json
{
  "description": "Closet organization structure",
  "closets": [
    { closet objects }
  ]
}
```

---

## Closet Object Schema

```json
{
  "id": "closet_1",                    // Unique identifier (e.g., closet_1, closet_bedroom)
  "name": "Linen Closet",              // Display name
  "location": "Hallway",               // Physical location
  "shelves": [
    { shelf objects }
  ]
}
```

### Required fields:
- **id**: Unique string (no spaces, use underscores)
- **name**: Human-readable closet name
- **location**: Where in the house it's located
- **shelves**: Array of shelf objects (can be empty `[]`)

### Example closet:
```json
{
  "id": "closet_master_bedroom",
  "name": "Master Bedroom Closet",
  "location": "Master Bedroom",
  "shelves": []
}
```

---

## Shelf Object Schema

```json
{
  "id": "shelf_1",                     // Unique identifier
  "label": "Top Shelf",                // Display name (optional, defaults to "Shelf 1")
  "position_order": 0,                 // Order from top (0=topmost, 1=middle, etc.)
  "baskets": [
    { basket objects }
  ]
}
```

### Required fields:
- **id**: Unique string within the closet
- **position_order**: Number (0, 1, 2, etc. from top to bottom)
- **baskets**: Array of basket objects (can be empty `[]`)

### Optional fields:
- **label**: Description of the shelf (e.g., "Top Shelf", "Under bed"). If omitted, displays as "Shelf 1", "Shelf 2", etc.

### Example shelf:
```json
{
  "id": "shelf_master_1",
  "label": "Top Shelf",
  "position_order": 0,
  "baskets": []
}
```

---

## Basket Object Schema

```json
{
  "id": "basket_1",                    // Unique identifier
  "label": "Towels - Bath",            // Display name
  "basket_type": "BEDDING",            // Type: BEDDING, CLEANING, FIRST_AID_BASIC, FIRST_AID_ADVANCED
  "position_order": 0,                 // Order left-to-right (0=leftmost)
  "sub_bin": "TRAUMA"                  // (Optional) Sub-category for First Aid Advanced kits
}
```

### Required fields:
- **id**: Unique string within the shelf
- **label**: Description of basket contents
- **basket_type**: One of:
  - `BEDDING` - Sheets, blankets, towels, pillows
  - `CLEANING` - Cleaning supplies, mops, brushes
  - `FIRST_AID_BASIC` - Basic first aid kit
  - `FIRST_AID_ADVANCED` - Advanced first aid kit (with sub-bins)
- **position_order**: Number (0=leftmost, 1=next, etc.)

### Optional fields:
- **sub_bin**: For Advanced First Aid kits only. Examples:
  - `TRAUMA` - Tourniquets, gauze, bandages
  - `AIRWAY` - Airway management tools
  - `MEDICATIONS` - Medications and topicals
  - `PPE` - Personal protective equipment

### Example baskets:
```json
{
  "id": "basket_towels",
  "label": "Towels - Bath",
  "basket_type": "BEDDING",
  "position_order": 0
}
```

```json
{
  "id": "basket_trauma",
  "label": "Trauma Kit",
  "basket_type": "FIRST_AID_ADVANCED",
  "sub_bin": "TRAUMA",
  "position_order": 0
}
```

---

## Complete Example

Here's a complete closet with multiple shelves and baskets:

```json
{
  "description": "Closet organization structure",
  "closets": [
    {
      "id": "closet_linen",
      "name": "Linen Closet",
      "location": "Hallway",
      "shelves": [
        {
          "id": "shelf_linen_1",
          "label": "Top Shelf",
          "position_order": 0,
          "baskets": [
            {
              "id": "basket_bath_towels",
              "label": "Towels - Bath",
              "basket_type": "BEDDING",
              "position_order": 0
            },
            {
              "id": "basket_hand_towels",
              "label": "Towels - Hand",
              "basket_type": "BEDDING",
              "position_order": 1
            }
          ]
        },
        {
          "id": "shelf_linen_2",
          "label": "Middle Shelf",
          "position_order": 1,
          "baskets": [
            {
              "id": "basket_sheets_queen",
              "label": "Bed Sheets - Queen",
              "basket_type": "BEDDING",
              "position_order": 0
            },
            {
              "id": "basket_sheets_twin",
              "label": "Bed Sheets - Twin",
              "basket_type": "BEDDING",
              "position_order": 1
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Step-by-Step: Adding a New Closet

### 1. Identify your closet
- What room is it in? (e.g., "Master Bedroom", "Kitchen")
- What will you store in it? (e.g., linens, cleaning supplies, first aid)
- How many shelves?

### 2. Edit the JSON file
Open `data/json/closets.json` and add a new closet object to the `closets` array.

**Before:**
```json
{
  "description": "Closet organization structure",
  "closets": [
    { existing closet }
  ]
}
```

**After:**
```json
{
  "description": "Closet organization structure",
  "closets": [
    { existing closet },
    {
      "id": "closet_kitchen",
      "name": "Kitchen Pantry",
      "location": "Kitchen",
      "shelves": []
    }
  ]
}
```

### 3. Add shelves (optional)
Add shelf objects to the `shelves` array:

```json
{
  "id": "closet_kitchen",
  "name": "Kitchen Pantry",
  "location": "Kitchen",
  "shelves": [
    {
      "id": "shelf_pantry_1",
      "label": "Top Shelf",
      "position_order": 0,
      "baskets": []
    },
    {
      "id": "shelf_pantry_2",
      "label": "Middle Shelf",
      "position_order": 1,
      "baskets": []
    }
  ]
}
```

### 4. Add baskets (optional)
Add basket objects to the `baskets` array in each shelf:

```json
{
  "id": "shelf_pantry_1",
  "label": "Top Shelf",
  "position_order": 0,
  "baskets": [
    {
      "id": "basket_spices",
      "label": "Spices & Seasonings",
      "basket_type": "CLEANING",
      "position_order": 0
    },
    {
      "id": "basket_baking",
      "label": "Baking Supplies",
      "basket_type": "CLEANING",
      "position_order": 1
    }
  ]
}
```

### 5. Commit and push
```bash
git add data/json/closets.json
git commit -m "feat: Add Kitchen Pantry closet"
git push origin main
```

### 6. Verify
- Wait 1-2 minutes for GitHub Actions deployment
- Hard refresh your browser (Ctrl+Shift+R)
- Go to Dashboard to see your new closet!

---

## Naming Conventions

### IDs (for `id` field)
- Use lowercase
- Replace spaces with underscores
- Be descriptive but concise
- Examples:
  - ❌ `closet1` (too vague)
  - ✅ `closet_master_bedroom` (clear and specific)
  - ✅ `closet_kitchen_pantry` (clear)

### Labels (for `name` and `label` fields)
- Use title case (capitalize first letter)
- Be human-readable
- Examples:
  - ✅ "Master Bedroom Closet"
  - ✅ "Top Shelf"
  - ✅ "Bath Towels"

### Position Order
- Start at 0 for the first shelf/basket
- Increment by 1 for each subsequent item
- Reflects visual order (top to bottom for shelves, left to right for baskets)

---

## Common Tasks

### Add a shelf to an existing closet
Find the closet's `shelves` array and add:
```json
{
  "id": "shelf_new",
  "label": "Bottom Shelf",
  "position_order": 2,
  "baskets": []
}
```

### Add a basket to an existing shelf
Find the shelf's `baskets` array and add:
```json
{
  "id": "basket_new",
  "label": "My Items",
  "basket_type": "BEDDING",
  "position_order": 3
}
```

### Change a basket label
Find the basket and update the `label` field:
```json
{
  "label": "New Label Here"  // was "Old Label"
}
```

### Remove a basket
Delete the entire basket object from the `baskets` array.

### Remove a shelf
Delete the entire shelf object from the `shelves` array. ⚠️ This also removes all baskets on that shelf!

### Remove a closet
Delete the entire closet object from the `closets` array. ⚠️ This also removes all shelves and baskets!

---

## Testing Your Changes

After committing and pushing, here's what to verify:

1. **Closet appears on Dashboard**
   - Go to Dashboard
   - Look for your new closet card
   
2. **Shelves display correctly**
   - Check that shelves appear in the correct order
   - Verify labels display (or default shelf numbers show)

3. **Baskets are visible**
   - Verify baskets appear in left-to-right order
   - Check that basket labels are correct

4. **Inventory works**
   - Click on a basket
   - Try adding/editing inventory items
   - Verify Google Sheets integration works

---

## Troubleshooting

### Changes don't appear after refresh
1. Check that you committed and pushed to `main` branch
2. Wait 2+ minutes for GitHub Actions to deploy
3. Do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R on Mac)
4. Check browser console (F12) for JavaScript errors

### Closet displays but shelves/baskets don't show
- Check JSON syntax (open in VSCode to validate)
- Verify all required fields are present
- Make sure `id` values are unique within their parent

### JSON file won't parse
- Use a JSON validator: https://jsonlint.com/
- Common errors:
  - Missing commas between array elements
  - Trailing commas (not allowed in JSON)
  - Unclosed quotes
  - Duplicate `id` values

### Baskets appear in wrong order
- Check `position_order` values (should be 0, 1, 2, etc.)
- Numbers don't need to be sequential, but they determine order

---

## Best Practices

1. **Use meaningful IDs**
   - Don't use generic names like `closet1`, `shelf1`
   - Include location info: `closet_kitchen_pantry`

2. **Keep JSON clean**
   - Use consistent indentation (2 spaces)
   - Add descriptions in comments if needed

3. **Test after changes**
   - Always verify the structure on the website
   - Test inventory operations on a basket

4. **Backup before major changes**
   - Git makes this easy—just use `git revert` if needed

5. **Group related items**
   - Keep similar items on the same shelf
   - Use clear labels to distinguish between baskets

---

## Need Help?

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Use a JSON validator to check file syntax
3. Compare your structure with the [Complete Example](#complete-example)
4. Check GitHub Actions logs to see if deployment succeeded

Happy organizing! 🎉
