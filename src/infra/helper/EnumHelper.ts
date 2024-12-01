export class EnumHelper {
    static toEnumValue<E>(enumObj: E, value: unknown): E[keyof E] | undefined {
        if (Object.values(enumObj).includes(value)) {
          return value as E[keyof E];
        }
        return undefined;
      }
}