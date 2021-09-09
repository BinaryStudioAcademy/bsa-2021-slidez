package com.binarystudio.academy.slidez.domain.sessionEvent.mapper.jsonb;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.io.StringWriter;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

import com.binarystudio.academy.slidez.domain.session.event.DomainEvent;
import lombok.Data;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.usertype.UserType;

import com.fasterxml.jackson.databind.ObjectMapper;

@Data
public class JsonbType implements UserType {

	@Override
	public int[] sqlTypes() {
		return new int[] { Types.OTHER };
	}

	@Override
	public Class<DomainEvent> returnedClass() {
		return DomainEvent.class;
	}

	@Override
	public Object nullSafeGet(final ResultSet rs, final String[] names, final SharedSessionContractImplementor session,
			final Object owner) throws HibernateException, SQLException {
		final String cellContent = rs.getString(names[0]);
		if (cellContent == null) {
			return null;
		}
		try {
			final ObjectMapper mapper = new ObjectMapper();
			mapper.findAndRegisterModules();
			return mapper.readValue(cellContent.getBytes("UTF-8"), returnedClass());
		}
		catch (final Exception ex) {
			throw new RuntimeException("Failed to convert String to Invoice: " + ex.getMessage(), ex);
		}
	}

	@Override
	public void nullSafeSet(final PreparedStatement ps, final Object value, final int idx,
			final SharedSessionContractImplementor session) throws HibernateException, SQLException {
		if (value == null) {
			ps.setNull(idx, Types.OTHER);
			return;
		}
		try {
			final ObjectMapper mapper = new ObjectMapper();
			mapper.findAndRegisterModules();
			final StringWriter w = new StringWriter();
			mapper.writeValue(w, value);
			w.flush();
			ps.setObject(idx, w.toString(), Types.OTHER);
		}
		catch (final Exception ex) {
			throw new RuntimeException("Failed to convert Invoice to String: " + ex.getMessage(), ex);
		}
	}

	@Override
	public Object deepCopy(final Object value) throws HibernateException {
		try (ByteArrayOutputStream bos = new ByteArrayOutputStream();
				ObjectOutputStream oos = new ObjectOutputStream(bos);
				) {
			// use serialization to create a deep copy

			oos.writeObject(value);
			oos.flush();
            ByteArrayInputStream bais = new ByteArrayInputStream(bos.toByteArray());
            bais.close();
			return new ObjectInputStream(bais).readObject();
		}
		catch (ClassNotFoundException | IOException ex) {
			throw new HibernateException(ex);
		}
	}

	@Override
	public boolean isMutable() {
		return true;
	}

	@Override
	public Serializable disassemble(final Object value) throws HibernateException {
		return (Serializable) this.deepCopy(value);
	}

	@Override
	public Object assemble(final Serializable cached, final Object owner) throws HibernateException {
		return this.deepCopy(cached);
	}

	@Override
	public Object replace(final Object original, final Object target, final Object owner) throws HibernateException {
		return this.deepCopy(original);
	}

	@Override
	public boolean equals(final Object obj1, final Object obj2) throws HibernateException {
		if (obj1 == null) {
			return obj2 == null;
		}
		return obj1.equals(obj2);
	}

	@Override
	public int hashCode(final Object obj) throws HibernateException {
		return obj.hashCode();
	}

}
