/**
 * Collection ID: generatedcrafts
 * Interface for GeneratedCrafts
 */
export interface GeneratedCrafts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image */
  craftImage?: string;
  /** @wixFieldType text */
  localDescription?: string;
  /** @wixFieldType text */
  generatedEnglishTitle?: string;
  /** @wixFieldType text */
  generatedEnglishDescription?: string;
  /** @wixFieldType url */
  generatedVideoPreview?: string;
}
