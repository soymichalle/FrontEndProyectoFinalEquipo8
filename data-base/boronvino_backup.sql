--
-- PostgreSQL database dump
--

\restrict GRlm5wnDuswkKuczV84OuPMqKuDodLkIPKXmnLOR0SApWUK6QsMZk8WRyfdoJZv

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-11-26 19:34:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 232 (class 1259 OID 16883)
-- Name: carrito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carrito (
    id_carrito integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estado character varying(40) DEFAULT 'ACTIVO'::character varying NOT NULL,
    id_cliente integer NOT NULL
);


ALTER TABLE public.carrito OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16882)
-- Name: carrito_id_carrito_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.carrito ALTER COLUMN id_carrito ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.carrito_id_carrito_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 16819)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id_categoria integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16818)
-- Name: categoria_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.categoria ALTER COLUMN id_categoria ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categoria_id_categoria_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16780)
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id_cliente integer NOT NULL,
    nombre character varying(100) NOT NULL,
    correo_electronico character varying(100) NOT NULL,
    telefono character varying(20),
    contrasena character varying(255) NOT NULL,
    permisos character varying(20) DEFAULT 'cliente'::character varying NOT NULL
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16779)
-- Name: clientes_id_cliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.clientes ALTER COLUMN id_cliente ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.clientes_id_cliente_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 234 (class 1259 OID 16900)
-- Name: detalle_carrito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_carrito (
    id_detalle integer NOT NULL,
    cantidad integer NOT NULL,
    precio_total numeric(12,2) NOT NULL,
    id_carrito integer NOT NULL,
    id_producto integer NOT NULL,
    CONSTRAINT detalle_carrito_cantidad_check CHECK ((cantidad > 0)),
    CONSTRAINT detalle_carrito_precio_total_check CHECK ((precio_total >= (0)::numeric))
);


ALTER TABLE public.detalle_carrito OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16899)
-- Name: detalle_carrito_id_detalle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.detalle_carrito ALTER COLUMN id_detalle ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.detalle_carrito_id_detalle_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 230 (class 1259 OID 16856)
-- Name: factura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.factura (
    id_factura integer NOT NULL,
    descripcion text,
    cantidad integer NOT NULL,
    valor_total numeric(12,2) NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_forma_de_pago integer NOT NULL,
    id_cliente integer NOT NULL,
    CONSTRAINT factura_cantidad_check CHECK ((cantidad > 0)),
    CONSTRAINT factura_valor_total_check CHECK ((valor_total >= (0)::numeric))
);


ALTER TABLE public.factura OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16855)
-- Name: factura_id_factura_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.factura ALTER COLUMN id_factura ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.factura_id_factura_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16809)
-- Name: forma_de_pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forma_de_pago (
    id_forma_de_pago integer NOT NULL,
    nombre character varying(80) NOT NULL
);


ALTER TABLE public.forma_de_pago OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16808)
-- Name: forma_de_pago_id_forma_de_pago_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.forma_de_pago ALTER COLUMN id_forma_de_pago ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.forma_de_pago_id_forma_de_pago_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 16829)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id_productos integer NOT NULL,
    nombre character varying(150) NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    precio numeric(12,2) NOT NULL,
    imagen character varying,
    descripcion text,
    id_categoria integer NOT NULL,
    id_proveedor integer NOT NULL,
    CONSTRAINT productos_precio_check CHECK ((precio > (0)::numeric)),
    CONSTRAINT productos_stock_check CHECK ((stock >= 0))
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16828)
-- Name: productos_id_productos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.productos ALTER COLUMN id_productos ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.productos_id_productos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 16794)
-- Name: proveedores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedores (
    id_proveedor integer NOT NULL,
    nombre character varying(100) NOT NULL,
    correo_electronico character varying(100) NOT NULL,
    telefono character varying(20) NOT NULL,
    ciudad character varying(100),
    nit character varying(40) NOT NULL
);


ALTER TABLE public.proveedores OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16793)
-- Name: proveedores_id_proveedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.proveedores ALTER COLUMN id_proveedor ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.proveedores_id_proveedor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 5095 (class 0 OID 16883)
-- Dependencies: 232
-- Data for Name: carrito; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carrito (id_carrito, fecha_creacion, estado, id_cliente) FROM stdin;
1	2026-11-26 19:21:49.402829	ACTIVO	1
2	2026-11-26 19:21:49.402829	COMPLETADO	2
\.


--
-- TOC entry 5089 (class 0 OID 16819)
-- Dependencies: 226
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (id_categoria, nombre) FROM stdin;
1	Vinos Tintos
2	Vinos Frutales
3	Vinos Espumosos
\.


--
-- TOC entry 5083 (class 0 OID 16780)
-- Dependencies: 220
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (id_cliente, nombre, correo_electronico, telefono, contrasena, permisos) FROM stdin;
1	Camila Restrepo	camila.restrepo@correo.com	3001112233	hash_seguro_123	CLIENTE
2	Mateo Rojas	mateo.rojas@correo.com	3014445566	hash_contrase¤a_456	CLIENTE
\.


--
-- TOC entry 5097 (class 0 OID 16900)
-- Dependencies: 234
-- Data for Name: detalle_carrito; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_carrito (id_detalle, cantidad, precio_total, id_carrito, id_producto) FROM stdin;
1	2	170000.00	1	1
2	1	62000.00	1	2
3	1	95000.00	2	3
\.


--
-- TOC entry 5093 (class 0 OID 16856)
-- Dependencies: 230
-- Data for Name: factura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.factura (id_factura, descripcion, cantidad, valor_total, fecha, id_forma_de_pago, id_cliente) FROM stdin;
1	Compra de vinos para evento	2	170000.00	2026-11-26 19:22:10.411048	1	1
2	Pedido de temporada	1	95000.00	2026-11-26 19:22:10.411048	2	2
\.


--
-- TOC entry 5087 (class 0 OID 16809)
-- Dependencies: 224
-- Data for Name: forma_de_pago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forma_de_pago (id_forma_de_pago, nombre) FROM stdin;
1	Tarjeta de Cr‚dito
2	PSE / Transferencia
3	Efecty
\.


--
-- TOC entry 5091 (class 0 OID 16829)
-- Dependencies: 228
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id_productos, nombre, stock, precio, imagen, descripcion, id_categoria, id_proveedor) FROM stdin;
1	Malbec Reserva 2022	30	85000.00	/img/productos/malbec-2022.jpg	Vino tinto con notas a frutos rojos y roble	1	1
2	Sauvignon Blanc Cosecha	20	62000.00	/img/productos/sauvignon.jpg	Vino blanco fresco y c¡trico	2	2
3	Brut Ros‚ Edici¢n Especial	15	95000.00	/img/productos/brut-rose.jpg	Espumoso ideal para celebraciones	3	1
\.


--
-- TOC entry 5085 (class 0 OID 16794)
-- Dependencies: 222
-- Data for Name: proveedores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proveedores (id_proveedor, nombre, correo_electronico, telefono, ciudad, nit) FROM stdin;
1	Bodegas del Valle	ventas@bodegasvalle.com	3104567890	Cali	900123456-1
2	Vi¤edos Andinos	contacto@vinedosandinos.co	3159876543	Cali	900654321-8
\.


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 231
-- Name: carrito_id_carrito_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carrito_id_carrito_seq', 2, true);


--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 225
-- Name: categoria_id_categoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_categoria_seq', 3, true);


--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 219
-- Name: clientes_id_cliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_cliente_seq', 2, true);


--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 233
-- Name: detalle_carrito_id_detalle_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_carrito_id_detalle_seq', 3, true);


--
-- TOC entry 5107 (class 0 OID 0)
-- Dependencies: 229
-- Name: factura_id_factura_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.factura_id_factura_seq', 2, true);


--
-- TOC entry 5108 (class 0 OID 0)
-- Dependencies: 223
-- Name: forma_de_pago_id_forma_de_pago_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forma_de_pago_id_forma_de_pago_seq', 3, true);


--
-- TOC entry 5109 (class 0 OID 0)
-- Dependencies: 227
-- Name: productos_id_productos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_productos_seq', 3, true);


--
-- TOC entry 5110 (class 0 OID 0)
-- Dependencies: 221
-- Name: proveedores_id_proveedor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proveedores_id_proveedor_seq', 2, true);


--
-- TOC entry 4925 (class 2606 OID 16893)
-- Name: carrito carrito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id_carrito);


--
-- TOC entry 4917 (class 2606 OID 16827)
-- Name: categoria categoria_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_nombre_key UNIQUE (nombre);


--
-- TOC entry 4919 (class 2606 OID 16825)
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id_categoria);


--
-- TOC entry 4903 (class 2606 OID 16792)
-- Name: clientes clientes_correo_electronico_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_correo_electronico_key UNIQUE (correo_electronico);


--
-- TOC entry 4905 (class 2606 OID 16790)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id_cliente);


--
-- TOC entry 4927 (class 2606 OID 16911)
-- Name: detalle_carrito detalle_carrito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_carrito
    ADD CONSTRAINT detalle_carrito_pkey PRIMARY KEY (id_detalle);


--
-- TOC entry 4923 (class 2606 OID 16871)
-- Name: factura factura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY (id_factura);


--
-- TOC entry 4913 (class 2606 OID 16817)
-- Name: forma_de_pago forma_de_pago_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forma_de_pago
    ADD CONSTRAINT forma_de_pago_nombre_key UNIQUE (nombre);


--
-- TOC entry 4915 (class 2606 OID 16815)
-- Name: forma_de_pago forma_de_pago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forma_de_pago
    ADD CONSTRAINT forma_de_pago_pkey PRIMARY KEY (id_forma_de_pago);


--
-- TOC entry 4921 (class 2606 OID 16844)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_productos);


--
-- TOC entry 4907 (class 2606 OID 16805)
-- Name: proveedores proveedores_correo_electronico_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_correo_electronico_key UNIQUE (correo_electronico);


--
-- TOC entry 4909 (class 2606 OID 16807)
-- Name: proveedores proveedores_nit_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_nit_key UNIQUE (nit);


--
-- TOC entry 4911 (class 2606 OID 16803)
-- Name: proveedores proveedores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_pkey PRIMARY KEY (id_proveedor);


--
-- TOC entry 4932 (class 2606 OID 16894)
-- Name: carrito carrito_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.clientes(id_cliente);


--
-- TOC entry 4933 (class 2606 OID 16912)
-- Name: detalle_carrito detalle_carrito_id_carrito_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_carrito
    ADD CONSTRAINT detalle_carrito_id_carrito_fkey FOREIGN KEY (id_carrito) REFERENCES public.carrito(id_carrito);


--
-- TOC entry 4934 (class 2606 OID 16917)
-- Name: detalle_carrito detalle_carrito_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_carrito
    ADD CONSTRAINT detalle_carrito_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_productos);


--
-- TOC entry 4930 (class 2606 OID 16877)
-- Name: factura factura_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.clientes(id_cliente);


--
-- TOC entry 4931 (class 2606 OID 16872)
-- Name: factura factura_id_forma_de_pago_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_id_forma_de_pago_fkey FOREIGN KEY (id_forma_de_pago) REFERENCES public.forma_de_pago(id_forma_de_pago);


--
-- TOC entry 4928 (class 2606 OID 16845)
-- Name: productos productos_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categoria(id_categoria);


--
-- TOC entry 4929 (class 2606 OID 16850)
-- Name: productos productos_id_proveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id_proveedor);


-- Completed on 2026-11-26 19:34:44

--
-- PostgreSQL database dump complete
--

\unrestrict GRlm5wnDuswkKuczV84OuPMqKuDodLkIPKXmnLOR0SApWUK6QsMZk8WRyfdoJZv

