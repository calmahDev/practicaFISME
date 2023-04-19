import { createNewRecord } from "../model/createNewRecord.js";

describe("createNewRecord", () => {
  it("debe lanzar un error si no se proporcionan parámetros", () => {
    expect(() => {
      createNewRecord();
    }).toThrow("parameters are missing in crateNewRecord.js");
  });

  it("debe crear un nuevo registro con los parámetros proporcionados y un identificador único", () => {
    const motivo = "Motivo de prueba";
    const sender = "Remitente de prueba";
    const recipient = "Destinatario de prueba";
    const newRecord = createNewRecord(motivo, sender, recipient);
    expect(newRecord).toEqual(expect.objectContaining({
      motivo: motivo,
      sender: sender,
      recipient: recipient
    }));
    expect(newRecord.timestamp).toBeDefined();
    expect(newRecord.recordId).toBeDefined();
  });
});
