def text_to_binary(text: str) -> str:
    return ' '.join(format(ord(c), '08b') for c in text)

def binary_to_text(binary: str) -> str:
    chars = binary.split()
    return ''.join(chr(int(b, 2)) for b in chars)

def text_to_hex(text: str) -> str:
    return text.encode().hex()

def hex_to_text(hex_str: str) -> str:
    return bytes.fromhex(hex_str).decode()
