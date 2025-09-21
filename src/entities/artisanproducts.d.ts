/**
 * Collection ID: artisanproducts
 * Interface for ArtisanProducts
 */
export interface ArtisanProducts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  productTitle?: string;
  /** @wixFieldType text */
  productDescription?: string;
  /** @wixFieldType image */
  productImage?: string;
  /** @wixFieldType number */
  productPrice?: number;
  /** @wixFieldType text */
  productCategory?: string;
  /** @wixFieldType text */
  artisanName?: string;
}
