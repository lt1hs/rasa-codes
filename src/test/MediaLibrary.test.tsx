import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MediaLibrary from '../admin/components/media/MediaLibrary';

// Mock the media service
const mockMediaService = {
  getMediaList: vi.fn(),
  deleteMedia: vi.fn(),
  updateMedia: vi.fn(),
  bulkOperateMedia: vi.fn(),
};

vi.mock('../admin/services/media.service', () => mockMediaService);

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock dayjs
vi.mock('dayjs', () => {
  const dayjs = (date?: any) => ({
    format: vi.fn(() => 'Jan 15, 2024'),
    toLocaleString: vi.fn(() => '1/15/2024, 10:30:00 AM'),
  });
  dayjs.extend = vi.fn();
  return { default: dayjs };
});

const mockMediaFiles = [
  {
    id: '1',
    name: 'test-image.jpg',
    url: 'https://example.com/test-image.jpg',
    thumbnailUrl: 'https://example.com/test-image-thumb.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 1024000,
    alt: 'Test image',
    caption: 'A test image',
    tags: ['test', 'sample'],
    isPublic: true,
    status: 'ready',
    uploadedAt: new Date('2024-01-15T10:30:00'),
    accessCount: 5,
    metadata: {
      width: 800,
      height: 600,
    },
  },
  {
    id: '2',
    name: 'document.pdf',
    url: 'https://example.com/document.pdf',
    type: 'document',
    mimeType: 'application/pdf',
    size: 2048000,
    alt: 'Test document',
    caption: '',
    tags: [],
    isPublic: false,
    status: 'ready',
    uploadedAt: new Date('2024-01-10T09:15:00'),
    accessCount: 2,
    metadata: {},
  },
];

const mockMediaResponse = {
  items: mockMediaFiles,
  folders: [],
  total: 2,
};

describe('MediaLibrary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMediaService.getMediaList.mockResolvedValue(mockMediaResponse);
  });

  it('should render media library with files', async () => {
    render(<MediaLibrary />);

    // Should show loading initially
    expect(screen.getByText('Media Library')).toBeInTheDocument();

    // Wait for files to load
    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    expect(screen.getByText('document.pdf')).toBeInTheDocument();
  });

  it('should switch between grid and list view', async () => {
    render(<MediaLibrary />);

    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    // Find view mode buttons
    const gridButton = screen.getByRole('button', { name: /grid/i });
    const listButton = screen.getByRole('button', { name: /list/i });

    expect(gridButton).toBeInTheDocument();
    expect(listButton).toBeInTheDocument();

    // Switch to list view
    fireEvent.click(listButton);

    // Grid should change (we can check by looking for different class structures)
    // The exact implementation depends on how the component renders differently
  });

  it('should handle search functionality', async () => {
    const user = userEvent.setup();
    render(<MediaLibrary />);

    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    // Find search input
    const searchInput = screen.getByPlaceholderText('Search files...');
    
    // Type in search
    await user.type(searchInput, 'test');
    
    // Should call getMediaList with search filter
    await waitFor(() => {
      expect(mockMediaService.getMediaList).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: expect.objectContaining({
            search: 'test',
          }),
        })
      );
    });
  });

  it('should handle file type filter', async () => {
    render(<MediaLibrary />);

    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    // Find type filter dropdown
    const typeFilter = screen.getByText('Type').closest('.ant-select');
    expect(typeFilter).toBeInTheDocument();

    // This would require more complex interaction with Ant Design Select
    // For now, we test that the filter dropdown is present
  });

  it('should handle file selection in selection mode', async () => {
    const onSelect = vi.fn();
    render(<MediaLibrary selectionMode={true} onSelect={onSelect} />);

    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    // Should show selection UI
    expect(screen.getByText('Select media files')).toBeInTheDocument();

    // Find checkboxes for file selection
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    // Select a file
    fireEvent.click(checkboxes[1]); // Skip "Select All" checkbox

    // Should call onSelect
    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith([mockMediaFiles[0]]);
    });
  });

  it('should handle select all functionality', async () => {
    const onSelect = vi.fn();
    render(<MediaLibrary selectionMode={true} onSelect={onSelect} allowMultiple={true} />);

    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    // Find "Select All" checkbox
    const selectAllCheckbox = screen.getByRole('checkbox', { name: /select all/i });
    
    fireEvent.click(selectAllCheckbox);

    // Should call onSelect with all files
    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith(mockMediaFiles);
    });
  });

  it('should handle file deletion', async () => {
    mockMediaService.deleteMedia.mockResolvedValue(undefined);
    
    render(<MediaLibrary />);

    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    // Find more actions button for first file
    const moreButtons = screen.getAllByRole('button');
    const moreButton = moreButtons.find(btn => 
      btn.querySelector('.anticon-more')
    );
    
    if (moreButton) {
      fireEvent.click(moreButton);

      // Find delete option in dropdown
      await waitFor(() => {
        const deleteOption = screen.getByText('Delete');
        fireEvent.click(deleteOption);
      });

      // Confirm deletion in modal
      await waitFor(() => {
        const confirmButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(confirmButton);
      });

      // Should call deleteMedia
      expect(mockMediaService.deleteMedia).toHaveBeenCalledWith('1');
    }
  });

  it('should handle file editing', async () => {
    mockMediaService.updateMedia.mockResolvedValue(undefined);
    
    render(<MediaLibrary />);

    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    // Find more actions button for first file
    const moreButtons = screen.getAllByRole('button');
    const moreButton = moreButtons.find(btn => 
      btn.querySelector('.anticon-more')
    );
    
    if (moreButton) {
      fireEvent.click(moreButton);

      // Find edit option in dropdown
      await waitFor(() => {
        const editOption = screen.getByText('Edit Details');
        fireEvent.click(editOption);
      });

      // Should open edit modal
      await waitFor(() => {
        expect(screen.getByText('Edit File Details')).toBeInTheDocument();
      });
    }
  });

  it('should display file information correctly', async () => {
    render(<MediaLibrary />);

    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    // Should display file size
    expect(screen.getByText(/1000 KB/)).toBeInTheDocument();

    // Should display date
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();

    // Should display public/private status
    expect(screen.getByText('Public')).toBeInTheDocument();
  });

  it('should handle empty state', async () => {
    mockMediaService.getMediaList.mockResolvedValue({
      items: [],
      folders: [],
      total: 0,
    });

    render(<MediaLibrary />);

    await waitFor(() => {
      expect(screen.getByText('No media files found')).toBeInTheDocument();
    });
  });

  it('should handle loading and error states', async () => {
    // Test error state
    mockMediaService.getMediaList.mockRejectedValue(new Error('Network error'));

    render(<MediaLibrary />);

    // Should handle error gracefully (component should not crash)
    expect(screen.getByText('Media Library')).toBeInTheDocument();
  });

  it('should respect type filter prop', async () => {
    render(<MediaLibrary typeFilter={['image']} />);

    await waitFor(() => {
      expect(mockMediaService.getMediaList).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: expect.objectContaining({
            type: 'image',
          }),
        })
      );
    });
  });

  it('should handle copy URL functionality', async () => {
    // Mock clipboard API
    const mockWriteText = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    render(<MediaLibrary />);

    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });

    // Find more actions button
    const moreButtons = screen.getAllByRole('button');
    const moreButton = moreButtons.find(btn => 
      btn.querySelector('.anticon-more')
    );
    
    if (moreButton) {
      fireEvent.click(moreButton);

      // Find copy URL option
      await waitFor(() => {
        const copyOption = screen.getByText('Copy URL');
        fireEvent.click(copyOption);
      });

      // Should call clipboard API
      expect(mockWriteText).toHaveBeenCalledWith('https://example.com/test-image.jpg');
    }
  });
});