
import type { LoginResponse } from '@/services/auth/auth-type';


export const mockLoginResponse: {
  
  code: number;
  msg: string;
  data: any;
} = 
{
    "code": 200,
    "msg": "OK",
    "data": {
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTUwODI0NDUsImlhdCI6MTc1NDk5ODQ0NSwibmJmIjoxNzU0OTk4NDQ1LCJzdWIiOiIxNmE5NjdjNy1kMzUzLTQxYWItYmNlMS1hM2YxMzgwNWJjODIiLCJ0b2tlbl91dWlkIjoiMDYwMGI0ZjctNGU4My00MmNhLWJiN2YtMjI5Y2RmZjc1OTZmIn0.OYS2MNTbHSuuSS_FXXkxXrcHxx_LlEhmstn-yvn_YH70fc6TEjR-R3PKvgteYUaKvVaaBSmq-e8_IDuvgdBy4DmeHeW6hr5SbinhXIiKFef3Ip484lhtWrsoxC_MBpnTVsaMdj9eWJD_HDSL75lF4Z9mG2j4PJWbrddqNAmfMyZSZEqgkZxIMgwTI4Rx4OnQoAvgepZ_QICQmdtea6s0vqwBqfRov1b8lRlzAoUMkT0pGUUJZHi87Bs8HVDjBNmJXQyWt88RsOOMYeIAxdtAUJs_izwHf7Oa19Lsw_3XGpcj5nXuqd6AV9U0YyGn9OYZcKcP3JOwW1a6pPT0KO1pB98pRst0QaSn5mE2TscjmKgfSLXCgxE6nG_3aAw35ISWf0el2aJoH77QKrMb_onj-IiVjJAmCHUk5oA60G5-cYwVP7gra1msBxA8GHoTM2eIt2bXPuhuwLj5ClwqP80BRkUsCCazentv0qjLJO_xKluF4F0Zg6-ABuskd2Bctx8ieEidjQgeanB5ccod-wHPY6UuxYTp0GFqOp2wtAiDgAQ-8Wm6mJHqWJ6WTkLx81CP45tc2NcVv-3TNODLASwqwHAJNq8UH9H-6JVo2-MFv_1yW-fSzcpm9ZweWPizuUyn93kR7oU2WRKoLcux9xYe269iUJShG6LB2c1dsDCztPA",
        "duration": "1755082445h",
        "token_type": "bearer",
        "user": {
            "id": "16a967c7-d353-41ab-bce1-a3f13805bc82",
            "x_id": "d0a1rgqqjr0c73foqt0h",
            "firstname": "Sendchap",
            "lastname": "Admin",
            "password": "$2a$10$xAHnoPvgrk9G6XUfp0eqE.fLrU/WG1SqbkgqSwCX9jCHCbsirkPdC",
            "has_pin": false,
            "email": "admin@sendchap.ci",
            "avatar": "avatar1.png",
            "phone": "0715157071\n+2250715157071",
            "phone_verified": true,
            "email_verified": true,
            "country_id": "85f769bd-1688-4ae8-93c1-bfb964af956b",
            "country": {
                "id": "85f769bd-1688-4ae8-93c1-bfb964af956b",
                "x_id": "cvcl0fvneclc7ik7mu30",
                "name": "Côte d'ivoire",
                "code": "225",
                "iso_code": "CI",
                "phonenumber_length": 10,
                 },
            "verification_status": "unverified",
            "referred_by": null,
            "referral_code": null,
            "active": true,
            "role": {
                "id": "e464995c-43fc-416a-987d-067647883b84",
                "name": "super_admin",
                "description": "",
                "created_at": "2025-03-18T14:57:56.713609Z",
                "updated_at": "2025-03-18T14:57:56.713609Z"
            },
            "validated_phone_numbers": [],
            "account_verification": null,
            "created_at": "2025-05-02T11:56:36.111285Z",
            "updated_at": "2025-05-02T11:56:36.111285Z",
            "one_signal_subs_id": null
        }
    }
}