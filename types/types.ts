export interface ProductsResponse {
    meta: Meta;
    data: ProductsType[];
    pagination: Pagination;
}

export interface Meta {
    code: number;
    errors: any[];
}

export interface Pagination {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

export interface ProductsType {
    id: string;
    title: string;
    description: string;
    type: string;
    price: string;
    has_variant: boolean;
    variants_count: number;
    default_variant_id: string;
    is_in_stock: boolean;
    sale_price: string;
    sale_percent: number;
    featured_image: string;
    second_image: string;
    rating: Rating;
    trendy: number;
    best_seller: number;
    featured: number;
    clearance: number;
    brand: Brand;
    model_type: string;
    hidden: boolean;
    customizable_fields: any[];
}

export interface Rating {
    product_ratings: number;
    total_reviews_count: number;
}

export interface Brand {
    id: string;
    title: string;
    logo: string;
    products_count: number;
}


export interface CategoriesResponse {
    meta: Meta;
    data: CategoriesType[];
    pagination: Pagination;
}

export interface CategoriesType {
    id: string;
    title: string;
    order: number;
    children: CategoriesType[];
}




export interface BrandsResponse {
    meta: Meta;
    data: BrandsType[];
    pagination: Pagination;
}

export interface BrandsType {
    id: string;
    title: string;
    logo: string;
    products_count: number;
}

