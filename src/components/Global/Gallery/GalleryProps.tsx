export interface GalleryProps {
    images: string[];
    descriptions: string[];
    titles: string[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}