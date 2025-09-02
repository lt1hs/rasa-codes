import { QRCodeData } from '../pages/QRCodeManager';

const QR_CODES_STORAGE_KEY = 'admin_qr_codes';

export class QRCodeService {
  // Get all QR codes from localStorage
  static getQRCodes(): QRCodeData[] {
    try {
      const stored = localStorage.getItem(QR_CODES_STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed.map((qr: any) => ({
        ...qr,
        createdAt: new Date(qr.createdAt)
      }));
    } catch (error) {
      console.error('Error loading QR codes:', error);
      return [];
    }
  }

  // Save QR codes to localStorage
  static saveQRCodes(qrCodes: QRCodeData[]): void {
    try {
      localStorage.setItem(QR_CODES_STORAGE_KEY, JSON.stringify(qrCodes));
    } catch (error) {
      console.error('Error saving QR codes:', error);
    }
  }

  // Create a new QR code
  static createQRCode(qrData: Omit<QRCodeData, 'id' | 'createdAt'>): QRCodeData {
    const newQR: QRCodeData = {
      ...qrData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    const existingQRs = this.getQRCodes();
    const updatedQRs = [...existingQRs, newQR];
    this.saveQRCodes(updatedQRs);

    return newQR;
  }

  // Update an existing QR code
  static updateQRCode(updatedQR: QRCodeData): void {
    const existingQRs = this.getQRCodes();
    const updatedQRs = existingQRs.map(qr => 
      qr.id === updatedQR.id ? updatedQR : qr
    );
    this.saveQRCodes(updatedQRs);
  }

  // Delete a QR code
  static deleteQRCode(id: string): void {
    const existingQRs = this.getQRCodes();
    const updatedQRs = existingQRs.filter(qr => qr.id !== id);
    this.saveQRCodes(updatedQRs);
  }

  // Get QR code by ID
  static getQRCodeById(id: string): QRCodeData | null {
    const qrCodes = this.getQRCodes();
    return qrCodes.find(qr => qr.id === id) || null;
  }

  // Export QR codes as JSON
  static exportQRCodes(): string {
    const qrCodes = this.getQRCodes();
    return JSON.stringify(qrCodes, null, 2);
  }

  // Import QR codes from JSON
  static importQRCodes(jsonData: string): boolean {
    try {
      const importedQRs = JSON.parse(jsonData);
      if (!Array.isArray(importedQRs)) {
        throw new Error('Invalid data format');
      }

      const validatedQRs = importedQRs.map((qr: any) => ({
        ...qr,
        id: qr.id || Date.now().toString(),
        createdAt: qr.createdAt ? new Date(qr.createdAt) : new Date(),
      }));

      this.saveQRCodes(validatedQRs);
      return true;
    } catch (error) {
      console.error('Error importing QR codes:', error);
      return false;
    }
  }
}
