package com.calvities.encryption.secret;

import java.security.interfaces.RSAPublicKey;

/**
 * 具体案例代码
 */
public class password {
	public static void main(String[] args) throws Exception {
		//公钥字符串
		String publicKeyReturn = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvYMsORpRToThn/278mKmZ792GJhn+rvK2Dfoq0k3ckSPixyB9n96v98xl5HUTA4tOsPZ2qXYA4SRX36mBqpIzh5spKjp7b92dyKDazXB88g8cvajoXmbFuijcml+1klnsnXVwuq+Goq9eCuJ4LaBpH/T2NcYYV2Yo+a1QMmifEQIDAQAB";
		//还原公钥
		RSAPublicKey pubKey = RSAUtils.restorePublicKey(Base64Utils.decode(publicKeyReturn));
		System.out.println("加密方式:" + pubKey.getAlgorithm() + "\t\t布吉岛:" + pubKey.getPublicExponent());
		//mi 为加密后的密文 654321 为明文密码 
        String mi = RSAUtils.encryptByPublicKey("F54F61F63E37A99BDD4026E55BDCC4AF", pubKey);
        System.out.println(mi);
	}

}
