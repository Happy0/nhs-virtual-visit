--
-- PostgreSQL database dump
--
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: scheduled_calls_table; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.scheduled_calls_table (
    id integer NOT NULL,
    patient_name text,
    call_time timestamp with time zone,
    recipient_number text,
    call_id text,
    recipient_name character varying(255),
    provider character varying(255) DEFAULT 'jitsi'::character varying NOT NULL
);
--
-- Name: scheduled_calls_table_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.scheduled_calls_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
--
-- Name: scheduled_calls_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
ALTER SEQUENCE public.scheduled_calls_table_id_seq OWNED BY public.scheduled_calls_table.id;
--
-- Name: scheduled_calls_table id; Type: DEFAULT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.scheduled_calls_table ALTER COLUMN id SET DEFAULT nextval('public.scheduled_calls_table_id_seq'::regclass);
--
-- Name: scheduled_calls_table call_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.scheduled_calls_table
    ADD CONSTRAINT call_id_unique UNIQUE (call_id);
--
-- Name: scheduled_calls_table scheduled_calls_table_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.scheduled_calls_table
    ADD CONSTRAINT scheduled_calls_table_pkey PRIMARY KEY (id);
--
-- PostgreSQL database dump complete
--

