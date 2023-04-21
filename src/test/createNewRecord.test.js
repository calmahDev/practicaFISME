import { createNewRecord } from "../model/createNewRecord.js";

describe("createNewRecord", () => {
  it("debe lanzar un error si no se proporcionan parámetros", () => {
    expect(() => {
      createNewRecord();
    }).toThrow("parameters are missing in crateNewRecord.js");
    expect(() => {
      createNewRecord("Por realizar las practicas profesionales en la facultadad de ingenieria de sistemas y mecacniaca electrica");
    }).toThrow("parameters are missing in crateNewRecord.js");
    expect(() => {
      createNewRecord("Por realizar las practicas profesionales en la facultadad de ingenieria de sistemas y mecacniaca electrica","FISME");
    }).toThrow("parameters are missing in crateNewRecord.js");
  });

  it("debe crear un nuevo registro con los parámetros proporcionados y un identificador único", () => {
    const motivo = "Motivo de prueba";
    const remitente = "Remitente de prueba";
    const destinatario = "Destinatario de prueba";
    const newRecord = createNewRecord(motivo, remitente, destinatario);
    expect(newRecord).toEqual(expect.objectContaining({
      motivo: motivo,
      remitente: remitente,
      destinatario: destinatario
    }));
    expect(newRecord.timestamp).toBeDefined();
    expect(newRecord.recordId).toBeDefined();
  });
});
