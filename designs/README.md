# Design Files Cache

This folder stores cached design files for the TulipTech QA Architecture.

## Purpose

The QA skills (`qa-script-writer`, `qa-tc-writer`, `qa-strategist`) use this folder to:
- Cache Figma screenshots locally
- Store PNG designs for visual regression testing
- Track design metadata via MANIFEST.json
- Avoid re-fetching designs from external sources

## Structure

```
designs/
├── MANIFEST.json          # Cache metadata (tracked by Git)
├── .gitkeep              # Folder marker (tracked by Git)
├── README.md              # This file (tracked by Git)
└── [project-name]/        # Per-project design folders (NOT tracked)
    ├── login.png
    ├── dashboard.png
    └── .metadata/
        └── login.png.json
```

## How to Use

1. **Add Design Files:**
   ```bash
   # Copy designs to your project folder
   cp /path/to/designs/* designs/my-project/
   ```

2. **Update Manifest:**
   The QA skills will automatically update MANIFEST.json when they cache designs.

3. **Cache Status:**
   ```bash
   npm run designs:cache  # Check cache status
   ```

## Important Notes

- ✅ MANIFEST.json is tracked by Git
- ✅ Folder structure is tracked by Git
- ❌ Actual PNG/JPG design files are NOT tracked (kept local)
- ❌ Design folders are NOT tracked (kept local)

This keeps the repository lightweight while maintaining the cache structure.

## Multi-Project Support

Each project gets its own subfolder:
- `designs/ecommerce-checkout/` - Checkout feature designs
- `designs/user-management/` - User profile designs
- `designs/inventory-system/` - Inventory feature designs

---

**Last Updated:** 2026-04-27
