import base64

def encode_base64(text: str) -> str:
    return base64.b64encode(text.encode()).decode()

def decode_base64(text: str) -> str:
    return base64.b64decode(text).decode()

def encode_base32(text: str) -> str:
    return base64.b32encode(text.encode()).decode()

def decode_base32(text: str) -> str:
    return base64.b32decode(text).decode()
