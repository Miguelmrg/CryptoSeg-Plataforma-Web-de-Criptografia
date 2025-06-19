def encode(text: str, key: str) -> str:
    result = ""
    key = key.upper()
    key_index = 0
    for char in text:
        if char.isalpha():
            offset = 65 if char.isupper() else 97
            k = ord(key[key_index % len(key)]) - 65
            result += chr((ord(char) - offset + k) % 26 + offset)
            key_index += 1
        else:
            result += char
    return result

def decode(text: str, key: str) -> str:
    result = ""
    key = key.upper()
    key_index = 0
    for char in text:
        if char.isalpha():
            offset = 65 if char.isupper() else 97
            k = ord(key[key_index % len(key)]) - 65
            result += chr((ord(char) - offset - k) % 26 + offset)
            key_index += 1
        else:
            result += char
    return result
