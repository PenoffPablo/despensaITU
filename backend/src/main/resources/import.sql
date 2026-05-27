-- Inserciones de datos iniciales en H2 (RAM)
INSERT INTO persona (nombre, apellido, cedula, telefono, correo, usuario, contrasenia) VALUES ('Juan', 'Pérez', '1234567-8', '099123456', 'juan.perez@despensaitu.com', 'admin', 'admin123');
INSERT INTO gerente (id_persona, id_gerente) VALUES (1, 1);
INSERT INTO despensa (id_gerente) VALUES (1);
INSERT INTO ingrediente (nombre, cantidad_stock_kilos) VALUES ('Harina 000', 150.5);
INSERT INTO ingrediente (nombre, cantidad_stock_kilos) VALUES ('Azúcar Común', 80.2);
INSERT INTO ingrediente (nombre, cantidad_stock_kilos) VALUES ('Sal Fina', 12.0);
INSERT INTO ingrediente (nombre, cantidad_stock_kilos) VALUES ('Aceite de Girasol', 45.8);
INSERT INTO ingrediente (nombre, cantidad_stock_kilos) VALUES ('Leche Entera', 60.0);
