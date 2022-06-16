package uj.pprochot.www.backend.validator;

public interface Validator<T> {

    boolean isValid(T obj);
}
