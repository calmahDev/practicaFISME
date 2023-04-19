import { addRecordToPendingRecords } from "../model/addRecordToPendingRecords.js";

describe("addRecordToPendingRecords", () => {
  beforeEach(() => {
    // Se reinicia el estado global antes de cada prueba
    global.pendingRecords = [];
    global.chain = [];
  });

  it("debe lanzar un error si no se proporcionan parámetros", () => {
    expect(() => {
      addRecordToPendingRecords();
    }).toThrow("parameters are missing in addRecordToPendingRecords.js");
  });

  it("debe agregar un objeto de registro a los registros pendientes y devolver la longitud de la cadena", () => {
    const recordObj = { data: "Registro de prueba" };
    const chainLength = addRecordToPendingRecords(recordObj);
    expect(global.pendingRecords).toContain(recordObj);
    expect(chainLength).toBe(0); // La longitud de la cadena debe ser 0 porque no se ha agregado ningún bloque todavía
  });
});
