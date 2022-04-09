--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: checkusernameavailability(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.checkusernameavailability(_user_name text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
declare
        isExist boolean:=false;
    begin

    return isExist;
    end ;
$$;


ALTER FUNCTION public.checkusernameavailability(_user_name text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: flights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flights (
    id bigint NOT NULL,
    airline_id bigint NOT NULL,
    origin_country_id integer NOT NULL,
    destination_country_id integer NOT NULL,
    departure_time timestamp without time zone NOT NULL,
    landing_time timestamp without time zone NOT NULL,
    remaining_tickets integer NOT NULL
);


ALTER TABLE public.flights OWNER TO postgres;

--
-- Name: get_arrival_flights(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_arrival_flights(_country_id bigint) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
begin
        return query
        select * from flights where flights.destination_country_id=_country_id
         AND (flights.landing_time between now() AND (now() + interval '12 hours'));



    end;

$$;


ALTER FUNCTION public.get_arrival_flights(_country_id bigint) OWNER TO postgres;

--
-- Name: get_departure_flights(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_departure_flights(_country_id bigint) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
begin
        return query
        select * from flights where flights.origin_country_id=_country_id
        AND (flights.departure_time between (now() - interval '12 hours') AND now());


    end;

$$;


ALTER FUNCTION public.get_departure_flights(_country_id bigint) OWNER TO postgres;

--
-- Name: get_flights_by_airline_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_flights_by_airline_id(_airline_id bigint) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
    begin
       return query
       select * from flights where flights.airline_id=_airline_id;
    end;
    $$;


ALTER FUNCTION public.get_flights_by_airline_id(_airline_id bigint) OWNER TO postgres;

--
-- Name: get_flights_by_parameters(bigint, bigint, timestamp without time zone); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_flights_by_parameters(_origin_country_id bigint, _destination_country_id bigint, _date timestamp without time zone) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
    begin
       return query
       select * from flights where flights.origin_country_id=_origin_country_id
       AND flights.destination_country_id=_destination_country_id
       AND flights.departure_time=_date;
    end;

    $$;


ALTER FUNCTION public.get_flights_by_parameters(_origin_country_id bigint, _destination_country_id bigint, _date timestamp without time zone) OWNER TO postgres;

--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id bigint NOT NULL,
    flight_id bigint NOT NULL,
    customer_id bigint NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: get_tickets_by_customer(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_tickets_by_customer(_customer_id bigint) RETURNS SETOF public.tickets
    LANGUAGE plpgsql
    AS $$
    begin
        return query
        select * from tickets where tickets.customer_id=_customer_id;

    end;

    $$;


ALTER FUNCTION public.get_tickets_by_customer(_customer_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_airline(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_airline(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int:=0;
    begin
        With rows AS (
            DELETE FROM airlines
            WHERE id=_id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
    end ;
    $$;


ALTER FUNCTION public.sp_delete_airline(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_and_reset_airlines(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_delete_and_reset_airlines()
    LANGUAGE plpgsql
    AS $$
begin
        delete from airlines
        where id >= 1;
        alter sequence airlines_id_seq restart with 1;
    end;
$$;


ALTER PROCEDURE public.sp_delete_and_reset_airlines() OWNER TO postgres;

--
-- Name: sp_delete_and_reset_countries(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_delete_and_reset_countries()
    LANGUAGE plpgsql
    AS $$
    begin
        delete from countries
        where id >= 1;
        alter sequence countries_id_seq restart with 1;
    end;
    $$;


ALTER PROCEDURE public.sp_delete_and_reset_countries() OWNER TO postgres;

--
-- Name: sp_delete_and_reset_customers(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_delete_and_reset_customers()
    LANGUAGE plpgsql
    AS $$
begin
        delete from customers
        where id >= 1;
        alter sequence customers_id_seq restart with 1;
    end;
$$;


ALTER PROCEDURE public.sp_delete_and_reset_customers() OWNER TO postgres;

--
-- Name: sp_delete_and_reset_flights(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_delete_and_reset_flights()
    LANGUAGE plpgsql
    AS $$
begin
        delete from flights
        where id >= 1;
        alter sequence flights_id_seq restart with 1;
    end;
$$;


ALTER PROCEDURE public.sp_delete_and_reset_flights() OWNER TO postgres;

--
-- Name: sp_delete_and_reset_tickets(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_delete_and_reset_tickets()
    LANGUAGE plpgsql
    AS $$
begin
        delete from tickets
        where id >= 1;
        alter sequence tickets_id_seq restart with 1;
    end;
$$;


ALTER PROCEDURE public.sp_delete_and_reset_tickets() OWNER TO postgres;

--
-- Name: sp_delete_and_reset_users(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_delete_and_reset_users()
    LANGUAGE plpgsql
    AS $$
begin
        delete from users
        where id >= 1;
        alter sequence users_id_seq restart with 1;
    end;
$$;


ALTER PROCEDURE public.sp_delete_and_reset_users() OWNER TO postgres;

--
-- Name: sp_delete_countries(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_countries(_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM countries
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_countries(_id integer) OWNER TO postgres;

--
-- Name: sp_delete_customers(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_customers(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int:=0;
    begin
        With rows AS (
            DELETE FROM customers
            WHERE id=_id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
    end ;
    $$;


ALTER FUNCTION public.sp_delete_customers(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_flights(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_flights(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int:=0;
    begin
        With rows AS (
            DELETE FROM flights
            WHERE id=_id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
    end ;
    $$;


ALTER FUNCTION public.sp_delete_flights(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_ticket(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_ticket(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int:=0;
    begin
        With rows AS (
            DELETE FROM tickets
            WHERE id=_id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
    end ;
    $$;


ALTER FUNCTION public.sp_delete_ticket(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_user(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_user(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM users
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_user(_id bigint) OWNER TO postgres;

--
-- Name: airlines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.airlines (
    id bigint NOT NULL,
    name text NOT NULL,
    country_id integer NOT NULL,
    user_id bigint
);


ALTER TABLE public.airlines OWNER TO postgres;

--
-- Name: sp_get_airline_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_airline_by_id(_id bigint) RETURNS SETOF public.airlines
    LANGUAGE plpgsql
    AS $$

    begin
        RETURN QUERY
        SELECT * from airlines
        WHERE id=_id;
    end;

    $$;


ALTER FUNCTION public.sp_get_airline_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_airline_by_user(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_airline_by_user(_user_name text) RETURNS TABLE(id bigint, name text, username text)
    LANGUAGE plpgsql
    AS $$
BEGIN
            RETURN QUERY
            SELECT a.id, a.name,u.username
            from airlines a
            join users u on u.id = a.user_id ;

        END;
$$;


ALTER FUNCTION public.sp_get_airline_by_user(_user_name text) OWNER TO postgres;

--
-- Name: sp_get_all_airlines(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_airlines() RETURNS TABLE(id bigint, name text, country_id integer, user_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
        RETURN QUERY
        SELECT * from airlines;
    END;
$$;


ALTER FUNCTION public.sp_get_all_airlines() OWNER TO postgres;

--
-- Name: sp_get_all_airlines_join(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_airlines_join() RETURNS TABLE(id bigint, name text, country text, username text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT a.id, a.name, c.name, u.username
             from airlines a
            join countries c on a.country_id = c.id
            join users u on a.user_id=u.id;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_airlines_join() OWNER TO postgres;

--
-- Name: sp_get_all_countries(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_countries() RETURNS TABLE(id integer, name text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from countries;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_countries() OWNER TO postgres;

--
-- Name: sp_get_all_customers(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_customers() RETURNS TABLE(id bigint, first_name text, last_name text, address text, phone_no text, user_id bigint, credit_card_no text)
    LANGUAGE plpgsql
    AS $$
BEGIN
        RETURN QUERY
        SELECT * from customers;
    END;
$$;


ALTER FUNCTION public.sp_get_all_customers() OWNER TO postgres;

--
-- Name: sp_get_all_flights(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_flights() RETURNS TABLE(id bigint, airline_id bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone, remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
        RETURN QUERY
        SELECT * from flights;
    END;
$$;


ALTER FUNCTION public.sp_get_all_flights() OWNER TO postgres;

--
-- Name: sp_get_all_flights_join(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_flights_join() RETURNS TABLE(id bigint, airline_name text, origin_country_name text, destination_country_name text, departure_time timestamp without time zone, landing_time timestamp without time zone, remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
            RETURN QUERY
            SELECT f.id, a.name, c.name,c1.name,f.departure_time,f.landing_time,f.remaining_tickets
             from flights f
            join countries c on f.origin_country_id = c.id
            join countries c1 on f.destination_country_id = c1.id
            join airlines a on f.airline_id=a.id;
        END;
$$;


ALTER FUNCTION public.sp_get_all_flights_join() OWNER TO postgres;

--
-- Name: sp_get_all_tickets(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_tickets() RETURNS TABLE(id bigint, flight_id bigint, customer_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
        RETURN QUERY
        SELECT * from tickets;
    END;
$$;


ALTER FUNCTION public.sp_get_all_tickets() OWNER TO postgres;

--
-- Name: sp_get_all_tickets_join(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_tickets_join() RETURNS TABLE(id bigint, name text, first_name text, last_name text, departure_time timestamp without time zone, landing_time timestamp without time zone, origin text)
    LANGUAGE plpgsql
    AS $$
BEGIN
            RETURN QUERY
            SELECT t.id, a.name , c.first_name, c.last_name,f.departure_time,f.landing_time,cu.name
             from tickets t
            join flights f on t.flight_id = f.id
            join customers c on t.customer_id=c.id
            join airlines a on f.airline_id=a.id
            join countries cu on f.origin_country_id=cu.id;
        END;
$$;


ALTER FUNCTION public.sp_get_all_tickets_join() OWNER TO postgres;

--
-- Name: sp_get_all_users(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_users() RETURNS TABLE(id bigint, username text, password text, email text, rule text)
    LANGUAGE plpgsql
    AS $$
BEGIN
        RETURN QUERY
        SELECT * from users;
    END;
$$;


ALTER FUNCTION public.sp_get_all_users() OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: sp_get_country_by_id(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_country_by_id(_id integer) RETURNS SETOF public.countries
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from countries
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_country_by_id(_id integer) OWNER TO postgres;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id bigint NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    address text NOT NULL,
    phone_no text NOT NULL,
    user_id bigint NOT NULL,
    credit_card_no text NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: sp_get_customer_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_customer_by_id(_id bigint) RETURNS SETOF public.customers
    LANGUAGE plpgsql
    AS $$

    begin
        RETURN QUERY
        SELECT * from customers
        WHERE id=_id;
    end;


    $$;


ALTER FUNCTION public.sp_get_customer_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_customer_by_user(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_customer_by_user(_user_name text) RETURNS TABLE(id bigint, first_name text, last_name text)
    LANGUAGE plpgsql
    AS $$
BEGIN
            RETURN QUERY
            SELECT c.id, c.first_name,c.last_name
            from customers c
            join users u on u.id = c.user_id AND u.username=_user_name;

        END;
$$;


ALTER FUNCTION public.sp_get_customer_by_user(_user_name text) OWNER TO postgres;

--
-- Name: sp_get_flight_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_flight_by_id(_id bigint) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$

    begin
        RETURN QUERY
        SELECT * from flights
        WHERE id=_id;
    end;


    $$;


ALTER FUNCTION public.sp_get_flight_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_ticket_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_ticket_by_id(_id bigint) RETURNS SETOF public.tickets
    LANGUAGE plpgsql
    AS $$

    begin
        RETURN QUERY
        SELECT * from tickets
        WHERE id=_id;
    end;

    $$;


ALTER FUNCTION public.sp_get_ticket_by_id(_id bigint) OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    rule text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: sp_get_user_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_user_by_id(_id bigint) RETURNS SETOF public.users
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from users
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_user_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_user_by_username(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_user_by_username(_user_name text) RETURNS SETOF public.users
    LANGUAGE plpgsql
    AS $$
BEGIN
            RETURN QUERY
            SELECT *
            from users u
            where u.username=_user_name;

        END;
$$;


ALTER FUNCTION public.sp_get_user_by_username(_user_name text) OWNER TO postgres;

--
-- Name: sp_insert_airline(text, integer, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_airline(_name text, _country_id integer, _user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        new_id bigint;
    begin
        INSERT INTO airlines(name, country_id, user_id)
        VALUES (_name,_country_id,_user_id)
        returning id into  new_id;
        return new_id;
    end;

    $$;


ALTER FUNCTION public.sp_insert_airline(_name text, _country_id integer, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_country(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_country(_name text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO countries (name)
            VALUES (_name)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_country(_name text) OWNER TO postgres;

--
-- Name: sp_insert_customer(text, text, text, text, bigint, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_customer(_first_name text, _last_name text, _address text, _phone_no text, _user_id bigint, _credit_card_no text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        new_id bigint;
    begin
        INSERT INTO customers(first_name, last_name, address, phone_no, user_id, credit_card_no)
        VALUES (_first_name,_last_name,_address,_phone_no,_user_id,_credit_card_no)
        returning id into  new_id;
        return new_id;
    end;

    $$;


ALTER FUNCTION public.sp_insert_customer(_first_name text, _last_name text, _address text, _phone_no text, _user_id bigint, _credit_card_no text) OWNER TO postgres;

--
-- Name: sp_insert_flight(bigint, integer, integer, timestamp without time zone, timestamp without time zone, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_flight(_airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        new_id bigint;
    begin
        INSERT INTO flights(airline_id, origin_country_id, destination_country_id,
                            departure_time, landing_time,remaining_tickets)
        VALUES (_airline_id,_origin_country_id,_destination_country_id,_departure_time,
                _landing_time,_remaining_tickets)
        returning id into  new_id;
        return new_id;
    end;

    $$;


ALTER FUNCTION public.sp_insert_flight(_airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) OWNER TO postgres;

--
-- Name: sp_insert_ticket(bigint, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_ticket(_flight_id bigint, _customer_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        new_id bigint;
    begin
        INSERT INTO tickets( flight_id, customer_id)
        VALUES (_flight_id,_customer_id)
        returning id into  new_id;
        return new_id;
    end;

    $$;


ALTER FUNCTION public.sp_insert_ticket(_flight_id bigint, _customer_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_users(text, text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_users(_username text, _password text, _email text, _rule text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO users (username,password,email,rule)
            VALUES (_username,_password,_email,_rule)
            RETURNING id into new_id;

            return new_id;
        END;
$$;


ALTER FUNCTION public.sp_insert_users(_username text, _password text, _email text, _rule text) OWNER TO postgres;

--
-- Name: sp_update_airlines(bigint, text, integer, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_airlines(_id bigint, _name text, _country_id integer, _user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int:=0;
    begin
        WITH rows as (
            UPDATE airlines
            SET name=_name,country_id=_country_id,user_id=_user_id
            WHERE id=_id
            returning 1)
            select count(*) into rows_count from rows;
            return rows_count;
    end;
    $$;


ALTER FUNCTION public.sp_update_airlines(_id bigint, _name text, _country_id integer, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_update_countries(integer, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_countries(_id integer, _name text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
    rows_count int:=0;
BEGIN
          WITH rows as (
              UPDATE countries
                  SET name = _name
                  WHERE id = _id
              RETURNING 1
          )
         select count(*) into rows_count from rows;
            return rows_count;

        END;
$$;


ALTER FUNCTION public.sp_update_countries(_id integer, _name text) OWNER TO postgres;

--
-- Name: sp_update_customers(bigint, text, text, text, text, bigint, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_customers(_id bigint, _first_name text, _last_name text, _address text, _phone_no text, _user_id bigint, _credit_card_no text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int:=0;
    begin
        WITH rows as (
            UPDATE customers
            SET first_name=_first_name,last_name=_last_name,address=_address,phone_no=_phone_no,
                user_id=_user_id,credit_card_no=_credit_card_no
            WHERE id=_id
            returning 1)
            select count(*) into rows_count from rows;
            return rows_count;

    end;



    $$;


ALTER FUNCTION public.sp_update_customers(_id bigint, _first_name text, _last_name text, _address text, _phone_no text, _user_id bigint, _credit_card_no text) OWNER TO postgres;

--
-- Name: sp_update_flights(bigint, bigint, integer, integer, timestamp without time zone, timestamp without time zone, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_flights(_id bigint, _airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int:=0;
    begin
        WITH rows as (
            UPDATE flights
            SET airline_id=_airline_id,origin_country_id=_origin_country_id,destination_country_id=_destination_country_id,
                departure_time=_departure_time,landing_time=_landing_time,remaining_tickets=_remaining_tickets
            WHERE id=_id
            returning 1)
            select count(*) into rows_count from rows;
            return rows_count;
    end;
    $$;


ALTER FUNCTION public.sp_update_flights(_id bigint, _airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) OWNER TO postgres;

--
-- Name: sp_update_flights_remaining_ticket(bigint, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_flights_remaining_ticket(_id bigint, _before_tickets integer) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
declare
        rows_count int:=0;
    begin
        WITH rows as (
            UPDATE flights
            SET remaining_tickets=_before_tickets-1
            WHERE id=_id
            returning 1)
            select count(*) into rows_count from rows;
            return rows_count;
    end;
$$;


ALTER FUNCTION public.sp_update_flights_remaining_ticket(_id bigint, _before_tickets integer) OWNER TO postgres;

--
-- Name: sp_update_tickets(bigint, bigint, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_tickets(_id bigint, _flight_id bigint, _customer_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int:=0;
    begin
        WITH rows as (
            UPDATE tickets
            SET flight_id=_flight_id,customer_id=_customer_id
            WHERE id=_id
            returning 1)
            select count(*) into rows_count from rows;
            return rows_count;
    end;
    $$;


ALTER FUNCTION public.sp_update_tickets(_id bigint, _flight_id bigint, _customer_id bigint) OWNER TO postgres;

--
-- Name: sp_update_user(bigint, text, text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_user(_id bigint, _username text, _password text, _email text, _rule text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE users
            SET username = _username, password = _password,
                email=_email,rule=_rule
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
$$;


ALTER FUNCTION public.sp_update_user(_id bigint, _username text, _password text, _email text, _rule text) OWNER TO postgres;

--
-- Name: sp_upsert_airlines(text, integer, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_upsert_airlines(_name text, _country_id integer, _user_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    declare
        new_id bigint := 0;
    begin
        if not exists(select 1 from airlines where name = _name) then
            insert into airlines (name,country_id,user_id) values (_name,_country_id,_user_id)
            returning id into new_id;
            return new_id;
        else
            update airlines
            set country_id = _country_id,user_id=_user_id
            where name = _name;
            return 0;
        end if;
    end;
    $$;


ALTER FUNCTION public.sp_upsert_airlines(_name text, _country_id integer, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_upsert_users(text, text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_upsert_users(_username text, _password text, _email text, _rule text) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare
        new_id bigint := 0;
    begin
        if not exists(select 1 from users where username = _username) then
            insert into users (username, password,email,rule) values (_username,_password,_email,_rule)
            returning id into new_id;
            return new_id;
        else
            update users
            set password = _password,email=_email
            where username = _username;
            return 0;
        end if;
    end;
$$;


ALTER FUNCTION public.sp_upsert_users(_username text, _password text, _email text, _rule text) OWNER TO postgres;

--
-- Name: airlines_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.airlines_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.airlines_id_seq OWNER TO postgres;

--
-- Name: airlines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.airlines_id_seq OWNED BY public.airlines.id;


--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.countries_id_seq OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: flights_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.flights_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.flights_id_seq OWNER TO postgres;

--
-- Name: flights_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.flights_id_seq OWNED BY public.flights.id;


--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tickets_id_seq OWNER TO postgres;

--
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: airlines id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines ALTER COLUMN id SET DEFAULT nextval('public.airlines_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: flights id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights ALTER COLUMN id SET DEFAULT nextval('public.flights_id_seq'::regclass);


--
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: airlines airlines_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT airlines_pk PRIMARY KEY (id);


--
-- Name: countries countries_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pk PRIMARY KEY (id);


--
-- Name: customers customers_first_name_last_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_first_name_last_name_key UNIQUE (first_name, last_name);


--
-- Name: customers customers_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pk PRIMARY KEY (id);


--
-- Name: flights flights_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_pk PRIMARY KEY (id);


--
-- Name: tickets tickets_flight_id_customer_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_flight_id_customer_id_key UNIQUE (flight_id, customer_id);


--
-- Name: tickets tickets_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: airlines_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX airlines_name_uindex ON public.airlines USING btree (name);


--
-- Name: airlines_user_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX airlines_user_id_uindex ON public.airlines USING btree (user_id);


--
-- Name: countries_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX countries_name_uindex ON public.countries USING btree (name);


--
-- Name: customers_credit_card_no_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX customers_credit_card_no_uindex ON public.customers USING btree (credit_card_no);


--
-- Name: customers_phone_no_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX customers_phone_no_uindex ON public.customers USING btree (phone_no);


--
-- Name: customers_user_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX customers_user_id_uindex ON public.customers USING btree (user_id);


--
-- Name: tickets_flight_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tickets_flight_id_uindex ON public.tickets USING btree (flight_id);


--
-- Name: users_email_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_uindex ON public.users USING btree (email);


--
-- Name: users_username_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_username_uindex ON public.users USING btree (username);


--
-- Name: airlines airlines_country_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT airlines_country_id_fk FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: airlines airlines_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT airlines_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: customers customers_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: flights flights___origin_country_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights___origin_country_id_fk FOREIGN KEY (origin_country_id) REFERENCES public.countries(id);


--
-- Name: flights flights_airlines_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_airlines_id_fk FOREIGN KEY (airline_id) REFERENCES public.airlines(id);


--
-- Name: flights flights_destination_country_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_destination_country_id_fk FOREIGN KEY (destination_country_id) REFERENCES public.countries(id);


--
-- Name: tickets tickets_customer_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_customer_id_fk FOREIGN KEY (customer_id) REFERENCES public.customers(id);


--
-- Name: tickets tickets_flight_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_flight_id_fk FOREIGN KEY (flight_id) REFERENCES public.flights(id);


--
-- PostgreSQL database dump complete
--

