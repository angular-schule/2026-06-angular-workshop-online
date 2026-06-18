export interface Book {
    isbn: string;
    title: string;
    description: string;
    authors: string[];
    price: number;
    rating: number;
}

// Gründe für Interface + Rohdaten
// - (De)Serialisierung von JSON
// - Klonbarkeit (=> Immutability)