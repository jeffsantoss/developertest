export class EnumHelper {
    static toEnumValue<E>(enumObj: E, value: unknown): E[keyof E] | undefined {
        // Verifica se o valor está presente nas chaves do enum
        if (Object.values(enumObj).includes(value)) {
          return value as E[keyof E];
        }
        return undefined;
      }
}