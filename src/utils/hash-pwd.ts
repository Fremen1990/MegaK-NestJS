import * as crypto from "crypto";

const salt = 'iasrbvaiusvb asiub435987345bsijfv b3934839483fb49vfb3849v9354vb3v'

export const hashPwd = (p:string): string => {
    const hmac = crypto.createHmac('sha512', salt);
    hmac.update(p);
    return hmac.digest('hex')
}