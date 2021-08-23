package com.binarystudio.academy.slidez.domain.link.util;

import com.binarystudio.academy.slidez.domain.link.exception.InvalidCharacterException;
import com.binarystudio.academy.slidez.domain.link.exception.OverflowException;

import java.util.HashMap;
import java.util.Map;

public final class ShortCodeGenerator {

    private static final char[] ALPHABET = new char[('z' - 'a' + 1) + ('9' - '0' + 1)];

    private static final Map<Character, Integer> CHAR_TO_ALPHABET_POS = new HashMap<>();

    static {
        int position = 0;
        for (int i = 'a'; i <= (int) 'z'; i++, position++) {
            ALPHABET[position] = (char) i;
            CHAR_TO_ALPHABET_POS.put((char) i, position);
        }
        for (int i = '0'; i <= (int) '9'; i++, position++) {
            ALPHABET[position] = (char) i;
            CHAR_TO_ALPHABET_POS.put((char) i, position);
        }
    }

    private ShortCodeGenerator() { }

    /**
     * Generate code in order. Example: previous code - aaaaa1; generated code - aaaaa2.
     * @param code - the last code
     * @return new code in order
     */
    public static String generateCode(String code) throws InvalidCharacterException, OverflowException {
        StringBuilder nextCode = new StringBuilder();
        // convert string to a number in base(powerOf(alphabet)) and add 1 to it;
        // carry over from previous operation
        int carry = 1;
        for (int i = code.length() - 1; i >= 0; i--) {
            var codePoint = CHAR_TO_ALPHABET_POS.get(code.charAt(i));
            if (codePoint == null) {
                throw new InvalidCharacterException(String.format("Invalid character %c in %s", code.charAt(i), code));
            }
            var newCodePoint = codePoint + carry;
            nextCode.append(ALPHABET[newCodePoint % ALPHABET.length]);
            carry = newCodePoint / ALPHABET.length;
        }
        if (carry != 0) {
            throw new OverflowException("Cannot generate new link due to overflow");
        }

        return nextCode.reverse().toString();
    }

}
