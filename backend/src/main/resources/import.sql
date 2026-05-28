-- Inserciones de datos iniciales en H2 (RAM)

-- Despensa
INSERT INTO despensa () VALUES ();

-- Persona base (Gerente)
INSERT INTO persona (nombre, cedula, telefono, correo, usuario, contrasenia) VALUES ('Juan Pérez', '1234567-8', '099123456', 'juan.perez@despensaitu.com', 'admin', 'admin123');
INSERT INTO gerente (id_persona, id_gerente, id_despensa) VALUES (1, 1, 1);

-- Ingredientes (descripcion String)
INSERT INTO ingrediente (descripcion) VALUES ('HARINA 000');
INSERT INTO ingrediente (descripcion) VALUES ('AZÚCAR COMÚN');
INSERT INTO ingrediente (descripcion) VALUES ('SAL FINA');
INSERT INTO ingrediente (descripcion) VALUES ('ACEITE DE GIRASOL');
INSERT INTO ingrediente (descripcion) VALUES ('LECHE ENTERA');

-- Vincular ingredientes a la despensa con stock
INSERT INTO despensa_ingrediente (id_despensa, id_ingrediente, cantidad_stock) VALUES (1, 1, 150);
INSERT INTO despensa_ingrediente (id_despensa, id_ingrediente, cantidad_stock) VALUES (1, 2, 80);
INSERT INTO despensa_ingrediente (id_despensa, id_ingrediente, cantidad_stock) VALUES (1, 3, 12);
INSERT INTO despensa_ingrediente (id_despensa, id_ingrediente, cantidad_stock) VALUES (1, 4, 45);
INSERT INTO despensa_ingrediente (id_despensa, id_ingrediente, cantidad_stock) VALUES (1, 5, 60);

-- Empleados de prueba
INSERT INTO persona (nombre, cedula, telefono, correo, usuario, contrasenia) VALUES ('Carlos García', '2345678-9', '099234567', 'carlos.garcia@despensaitu.com', NULL, NULL);
INSERT INTO empleado (id_persona, fecha_vinculacion, hora_ingreso, hora_salida) VALUES (2, '2025-01-15', '08:00:00', '16:00:00');
INSERT INTO mesero (id_persona, salario) VALUES (2, 25000.00);

INSERT INTO persona (nombre, cedula, telefono, correo, usuario, contrasenia) VALUES ('Ana López', '3456789-0', '099345678', 'ana.lopez@despensaitu.com', NULL, NULL);
INSERT INTO empleado (id_persona, fecha_vinculacion, hora_ingreso, hora_salida) VALUES (3, '2024-06-01', '09:00:00', '17:00:00');
INSERT INTO chef (id_persona, salario) VALUES (3, 35000.00);

-- Cliente de prueba
INSERT INTO persona (nombre, cedula, telefono, correo, usuario, contrasenia) VALUES ('María Rodríguez', '4567890-1', '099456789', 'maria.rodriguez@gmail.com', 'maria', 'maria123');
INSERT INTO cliente (id_persona) VALUES (4);

-- Receta de prueba
INSERT INTO receta (id_chef, nombre_receta, descripcion_proceso) VALUES (3, 'Milanesa Napolitana', 'Preparar la milanesa, agregar salsa de tomate, jamón y queso. Gratinar al horno.');

-- Alimentos de prueba (tipo_alimento es la columna discriminadora)
INSERT INTO alimento (tipo_alimento, nombre, precio, id_receta) VALUES ('PLATO_FUERTE', 'Milanesa Napolitana', 450.00, 1);
INSERT INTO alimento (tipo_alimento, nombre, precio, id_receta) VALUES ('PLATO_FUERTE', 'Pasta Carbonara', 380.00, NULL);
INSERT INTO alimento (tipo_alimento, nombre, precio, id_receta) VALUES ('BEBIDA', 'Agua Mineral', 80.00, NULL);
INSERT INTO alimento (tipo_alimento, nombre, precio, id_receta) VALUES ('BEBIDA', 'Limonada', 120.00, NULL);
INSERT INTO alimento (tipo_alimento, nombre, precio, id_receta) VALUES ('POSTRES', 'Flan Casero', 200.00, NULL);
INSERT INTO alimento (tipo_alimento, nombre, precio, id_receta) VALUES ('ADICIONALES', 'Papas Fritas', 150.00, NULL);

-- Menu administrado por el gerente
INSERT INTO menu (id_gerente) VALUES (1);
INSERT INTO menu_alimento (id_menu, id_alimento) VALUES (1, 1);
INSERT INTO menu_alimento (id_menu, id_alimento) VALUES (1, 2);
INSERT INTO menu_alimento (id_menu, id_alimento) VALUES (1, 3);
INSERT INTO menu_alimento (id_menu, id_alimento) VALUES (1, 4);
INSERT INTO menu_alimento (id_menu, id_alimento) VALUES (1, 5);
INSERT INTO menu_alimento (id_menu, id_alimento) VALUES (1, 6);

-- Segunda Despensa y su Gerente
INSERT INTO despensa () VALUES (); -- ID: 2
INSERT INTO persona (nombre, cedula, telefono, correo, usuario, contrasenia) VALUES ('Sofía Gómez', '5678901-2', '099567890', 'sofia.gomez@despensaitu.com', 'manager2', 'manager123');
INSERT INTO gerente (id_persona, id_gerente, id_despensa) VALUES (5, 2, 2);

-- Ingredientes adicionales
INSERT INTO ingrediente (descripcion) VALUES ('TOMATES FRESCOS'); -- ID: 6
INSERT INTO ingrediente (descripcion) VALUES ('QUESO MOZZARELLA'); -- ID: 7

-- Vincular ingredientes a la segunda despensa con stock diferente
INSERT INTO despensa_ingrediente (id_despensa, id_ingrediente, cantidad_stock) VALUES (2, 1, 40);  -- Harina (ID 1)
INSERT INTO despensa_ingrediente (id_despensa, id_ingrediente, cantidad_stock) VALUES (2, 2, 15);  -- Azúcar (ID 2)
INSERT INTO despensa_ingrediente (id_despensa, id_ingrediente, cantidad_stock) VALUES (2, 6, 95);  -- Tomates (ID 6)
INSERT INTO despensa_ingrediente (id_despensa, id_ingrediente, cantidad_stock) VALUES (2, 7, 30);  -- Queso (ID 7)
