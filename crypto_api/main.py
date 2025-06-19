from fastapi import FastAPI, Request, HTTPException
from utils import aes, base, binary_hex, cesar, hashings, rsa, vigenere

app = FastAPI(title="CryptoSeg API")

API_KEY = "SUA_CHAVE_SECRETA_DA_API"

@app.middleware("http")
async def check_api_key(request: Request, call_next):
    if request.url.path in ["/", "/docs", "/openapi.json"]:
        return await call_next(request)
    
    key = request.headers.get("x-api-key")
    if key != API_KEY:
        raise HTTPException(status_code=401, detail="API Key inválida.")
    return await call_next(request)

@app.get("/")
def index():
    return {"msg": "CryptoSeg API. Use x-api-key no header para acessar as rotas."}

# CESAR
@app.get("/cesar/encode")
def cesar_encode(text: str, shift: int):
    return {"result": cesar.encode(text, shift)}

@app.get("/cesar/decode")
def cesar_decode(text: str, shift: int):
    return {"result": cesar.decode(text, shift)}

# BASE
@app.get("/base64/encode")
def base64_encode(text: str):
    return {"result": base.encode_base64(text)}

@app.get("/base64/decode")
def base64_decode(text: str):
    return {"result": base.decode_base64(text)}

@app.get("/base32/encode")
def base32_encode(text: str):
    return {"result": base.encode_base32(text)}

@app.get("/base32/decode")
def base32_decode(text: str):
    return {"result": base.decode_base32(text)}

# VIGENERE
@app.get("/vigenere/encode")
def vigenere_encode(text: str, key: str):
    return {"result": vigenere.encode(text, key)}

@app.get("/vigenere/decode")
def vigenere_decode(text: str, key: str):
    return {"result": vigenere.decode(text, key)}

# HASH
@app.get("/hash/sha256")
def hash_sha256(text: str):
    return {"result": hashings.sha256(text)}

@app.get("/hash/sha1")
def hash_sha1(text: str):
    return {"result": hashings.sha1(text)}

@app.get("/hash/sha512")
def hash_sha512(text: str):
    return {"result": hashings.sha512(text)}

@app.get("/hash/md5")
def hash_md5(text: str):
    return {"result": hashings.md5(text)}

# AES
@app.get("/aes/encrypt")
def aes_encrypt(text: str, password: str):
    return {"result": aes.encrypt(text, password)}

@app.get("/aes/decrypt")
def aes_decrypt(cipher: str, password: str):
    return {"result": aes.decrypt(cipher, password)}

# RSA
@app.get("/rsa/generate_keys")
def rsa_generate():
    pub, priv = rsa.generate_keys()
    return {"public_key": pub, "private_key": priv}

@app.get("/rsa/encrypt")
def rsa_encrypt(text: str, public_key: str):
    return {"result": rsa.encrypt(text, public_key)}

@app.get("/rsa/decrypt")
def rsa_decrypt(cipher: str, private_key: str):
    return {"result": rsa.decrypt(cipher, private_key)}

# BINÁRIO e HEX
@app.get("/binary/encode")
def binary_encode(text: str):
    return {"result": binary_hex.text_to_binary(text)}

@app.get("/binary/decode")
def binary_decode(binary: str):
    return {"result": binary_hex.binary_to_text(binary)}

@app.get("/hex/encode")
def hex_encode(text: str):
    return {"result": binary_hex.text_to_hex(text)}

@app.get("/hex/decode")
def hex_decode(hex_str: str):
    return {"result": binary_hex.hex_to_text(hex_str)}
