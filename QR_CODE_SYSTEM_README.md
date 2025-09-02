# QR Code Management System

A comprehensive QR code generation and management system integrated into the admin panel.

## Features

### 🎨 Customization Options
- **Colors**: Custom foreground and background colors
- **Size**: Adjustable QR code dimensions (100px - 500px)
- **Logo**: Upload and embed custom logos
- **Error Correction**: Multiple levels (L, M, Q, H)

### 📋 Management Features
- **Create**: Generate QR codes with custom content
- **Edit**: Modify existing QR codes in real-time
- **Preview**: Live preview with instant updates
- **Download**: Export as PNG images
- **Bulk Operations**: Select and manage multiple QR codes
- **Templates**: Pre-designed templates for common use cases

### 🔧 Technical Features
- **Local Storage**: Persistent data storage
- **Export/Import**: JSON data backup and restore
- **Responsive Design**: Works on all screen sizes
- **Real-time Preview**: See changes instantly

## Usage

### Accessing the QR Code Manager
1. Navigate to the admin panel
2. Click on "QR Code Manager" in the sidebar
3. Start creating your first QR code

### Creating a QR Code
1. Click "Create QR Code" button
2. Fill in the required information:
   - **Name**: Descriptive name for the QR code
   - **Content**: URL, text, or any data to encode
   - **Customization**: Colors, size, logo, error correction
3. Preview your QR code in real-time
4. Click "Create QR Code" to save

### Using Templates
1. Switch to the "Templates" tab
2. Browse available templates
3. Click "Use" on your preferred template
4. Customize the content and settings
5. Save your QR code

### Bulk Operations
1. Select multiple QR codes using checkboxes
2. Use bulk actions to:
   - Download all selected QR codes
   - Delete multiple QR codes
   - Export as JSON

## File Structure

```
src/admin/
├── pages/
│   └── QRCodeManager.tsx          # Main QR code management page
├── components/QRCode/
│   ├── QRCodeGenerator.tsx        # QR code creation modal
│   ├── QRCodeList.tsx            # List of QR codes with selection
│   ├── QRCodePreview.tsx         # Edit and preview component
│   ├── QRCodeCanvas.tsx          # QR code rendering component
│   ├── QRCodeBulkActions.tsx     # Bulk operation controls
│   ├── QRCodeTemplates.tsx       # Template selection
│   └── index.ts                  # Component exports
└── services/
    └── qrCodeService.ts          # Data persistence service
```

## Dependencies

- `qrcode`: QR code generation library
- `html2canvas`: Canvas to image conversion
- `antd`: UI components
- `@heroicons/react`: Icons

## Permissions

The QR code system uses the following permissions:
- `qr.view`: View QR codes
- `qr.create`: Create new QR codes
- `qr.edit`: Edit existing QR codes
- `qr.delete`: Delete QR codes

## Data Storage

QR codes are stored in localStorage with the key `admin_qr_codes`. The data includes:
- QR code content and settings
- Creation timestamps
- Custom logos (as base64 data URLs)

## Future Enhancements

- [ ] Batch QR code generation from CSV
- [ ] QR code analytics and scan tracking
- [ ] Advanced templates with dynamic content
- [ ] Integration with external QR code services
- [ ] Scheduled QR code expiration
- [ ] QR code campaigns and grouping
