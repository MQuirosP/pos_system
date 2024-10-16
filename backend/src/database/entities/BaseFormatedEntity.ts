import { BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm";

export abstract class BaseFormattedEntity extends BaseEntity {
  [key: string]: any;
  protected abstract fieldsToLowerCase(): string[];
  protected abstract fieldsToCapitalize(): string[];

  @BeforeInsert()
  @BeforeUpdate()
  formatFields() {
    this.fieldsToLowerCase().forEach((field) => {
      const fieldValue = this[field];
      if (typeof fieldValue === "string") {
        this[field] = fieldValue.toLowerCase().trim();
      }
    });

    this.fieldsToCapitalize().forEach((field) => {
      const fieldValue = this[field];
      if (typeof fieldValue === "string") {
        this[field] = this.capitalize(fieldValue);
      }

    });
  }

  private capitalize(value: string): string {
    return value
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase())
      .trim();
  }
}
