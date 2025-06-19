def encode(text: str, shift: int) -> str:
    result = ""
    for char in text:
        if char.isalpha():
            base = 65 if char.isupper() else 97
            result += chr((ord(char) - base + shift) % 26 + base)
        else:
            result += char
    return result

def decode(text: str, shift: int) -> str:
    return encode(text, -shift)
