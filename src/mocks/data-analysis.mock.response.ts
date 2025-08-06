import { TransactionTypeEnum } from '@/services/transactions/transaction-type';
import type { DashboardResponse } from "@/services/dashboard/dashboard-alpha-type";


export const dataAnalysisBeneficiariesResponse: {
  
  code: number;
  msg: string;
  data: DashboardResponse;
} = {
    "code": 200,
    "msg": "Dashboard data retrieved successfully",
    "data": {
        "current_period_stats": {
            "count_txns": 7842,
            "count_transferts_txns": 8147,
            "sum_transfered_txns": 24302829,
            "count_collected_txns": 8288,
            "sum_collected_txns": 27161029,
            "count_giftcard_txns": 5,
            "sum_giftcard_txns": 84500
        },
        "previous_period_stats": {
            "count_txns": 13519,
            "count_transferts_txns": 13344,
            "sum_transfered_txns": 41120218,
            "count_collected_txns": 13519,
            "sum_collected_txns": 45094395,
            "count_giftcard_txns": 3,
            "sum_giftcard_txns": 57000
        },
        "sum_collected_txns_group_by_provider": [
           {
                "sum_txns": 20000000,
                "provider": {
                    "name": "in",
                    "image_url": "https://sendchapkyc.s3.us-east-1.amazonaws.com/networks/moov.png"
                }
            },
            {
                "sum_txns": 7161029,
                "provider": {
                    "name": "out",
                    "image_url": "https://sendchapkyc.s3.us-east-1.amazonaws.com/networks/orange.png"
                }
            },


          
        ],
        "sum_transfered_txns_group_by_provider": [
           {
                "sum_txns": 302829,
                "provider": {
                    "name": "in",
                    "image_url": "https://sendchapkyc.s3.us-east-1.amazonaws.com/networks/moov.png"
                }
            },
            {
                "sum_txns":  24000000,
                "provider": {
                    "name": "out",
                    "image_url": "https://sendchapkyc.s3.us-east-1.amazonaws.com/networks/orange.png"
                }
            },


           
        ],
        "count_gift_cards_group_by_brand": [
            {
                "brand": "Apple",
                "count": 4
            },
            {
                "brand": "PlayStation",
                "count": 1
            }
        ],
        "total_amount_gift_cards_group_by_brand": [
            {
                "brand": "Apple",
                "total_amount": 76000
            },
            {
                "brand": "PlayStation",
                "total_amount": 8500
            }
        ],
        "count_txns_group_by_status": [
            {
                "status": "Failed",
                "count_txns": 377
            },
            {
                "status": "Processing",
                "count_txns": 242
            },
            {
                "status": "failed",
                "count_txns": 346
            },
            {
                "status": "Successful",
                "count_txns": 8288
            },
            {
                "status": "Pending",
                "count_txns": 5
            }
        ],
        "count_txns_group_by_type_and_month": [
          {
        "type": "supply",
        "month_year": "2025-08-01T00:00:00Z",
        "count_txns": 24
          },
          {
              "type": "spend",
              "month_year": "2025-08-01T00:00:00Z",
              "count_txns": 60707
          },
          {
              "type": "supply",
              "month_year": "2025-07-01T00:00:00Z",
              "count_txns": 173
          },
          {
              "type": "spend",
              "month_year": "2025-07-01T00:00:00Z",
              "count_txns": 372846
          },
          {
              "type": "supply",
              "month_year": "2025-06-01T00:00:00Z",
              "count_txns": 144
          },
          {
              "type": "spend",
              "month_year": "2025-06-01T00:00:00Z",
              "count_txns": 303966
          },
          {
              "type": "supply",
              "month_year": "2025-05-01T00:00:00Z",
              "count_txns": 81
          },
          {
              "type": "spend",
              "month_year": "2025-05-01T00:00:00Z",
              "count_txns": 232700
          },
          {
              "type": "supply",
              "month_year": "2025-04-01T00:00:00Z",
              "count_txns": 74
          },
          {
              "type": "spend",
              "month_year": "2025-04-01T00:00:00Z",
              "count_txns": 179907
          },
          {
              "type": "supply",
              "month_year": "2025-03-01T00:00:00Z",
              "count_txns": 63
          },
          {
              "type": "spend",
              "month_year": "2025-03-01T00:00:00Z",
              "count_txns": 145751
          },
          {
              "type": "supply",
              "month_year": "2025-02-01T00:00:00Z",
              "count_txns": 105
          },
          {
              "type": "spend",
              "month_year": "2025-02-01T00:00:00Z",
              "count_txns": 96629
          },
          {
              "type": "supply",
              "month_year": "2025-01-01T00:00:00Z",
              "count_txns": 15
          },
          {
              "type": "supply",
              "month_year": "2025-01-01T00:00:00Z",
              "count_txns": 63
          },
          {
              "type": "spend",
              "month_year": "2025-01-01T00:00:00Z",
              "count_txns": 86145
          },
          {
              "type": "supply",
              "month_year": "2024-12-01T00:00:00Z",
              "count_txns": 38
          },
          {
              "type": "supply",
              "month_year": "2024-12-01T00:00:00Z",
              "count_txns": 41
          },
          {
              "type": "spend",
              "month_year": "2024-12-01T00:00:00Z",
              "count_txns": 69300
          },
          {
              "type": "supply",
              "month_year": "2024-11-01T00:00:00Z",
              "count_txns": 12
          },
          {
              "type": "spend",
              "month_year": "2024-11-01T00:00:00Z",
              "count_txns": 46635
          },
          {
              "type": "supply",
              "month_year": "2024-10-01T00:00:00Z",
              "count_txns": 1
          },
          {
              "type": "supply",
              "month_year": "2024-10-01T00:00:00Z",
              "count_txns": 2
          },
          {
              "type": "spend",
              "month_year": "2024-10-01T00:00:00Z",
              "count_txns": 40994
          },
          {
              "type": "spend",
              "month_year": "2024-09-01T00:00:00Z",
              "count_txns": 5
          },
          {
              "type": "supply",
              "month_year": "2024-09-01T00:00:00Z",
              "count_txns": 7
          },
          {
              "type": "spend",
              "month_year": "2024-09-01T00:00:00Z",
              "count_txns": 50223
          }
        ],
        "count_txns_group_by_provider_and_type": {
            "collected": [
                {
                    "name_provider": "Wave",
                    "status": "succeeded",
                    "count_txns": 6315
                },
                {
                    "name_provider": "Wave",
                    "status": "processing",
                    "count_txns": 534
                },
                {
                    "name_provider": "Orange",
                    "status": "successful",
                    "count_txns": 1430
                },
                {
                    "name_provider": "Orange",
                    "status": "initiated",
                    "count_txns": 45
                },
                {
                    "name_provider": "Orange",
                    "status": "failed",
                    "count_txns": 243
                },
                {
                    "name_provider": "Moov",
                    "status": "initiated",
                    "count_txns": 47
                },
                {
                    "name_provider": "Moov",
                    "status": "successful",
                    "count_txns": 112
                },
                {
                    "name_provider": "Moov",
                    "status": "failed",
                    "count_txns": 11
                },
                {
                    "name_provider": "MTN",
                    "status": "failed",
                    "count_txns": 82
                },
                {
                    "name_provider": "MTN",
                    "status": "pending",
                    "count_txns": 70
                },
                {
                    "name_provider": "MTN",
                    "status": "successful",
                    "count_txns": 348
                }
            ],
            "transfered": [
                {
                    "name_provider": "Wave",
                    "status": "pending",
                    "count_txns": 508
                },
                {
                    "name_provider": "Wave",
                    "status": "",
                    "count_txns": 5
                },
                {
                    "name_provider": "Wave",
                    "status": "failed",
                    "count_txns": 38
                },
                {
                    "name_provider": "Wave",
                    "status": "successful",
                    "count_txns": 6298
                },
                {
                    "name_provider": "Orange",
                    "status": "failed",
                    "count_txns": 223
                },
                {
                    "name_provider": "Orange",
                    "status": "successful",
                    "count_txns": 1423
                },
                {
                    "name_provider": "Orange",
                    "status": "pending",
                    "count_txns": 67
                },
                {
                    "name_provider": "Orange",
                    "status": "succeeded",
                    "count_txns": 5
                },
                {
                    "name_provider": "Moov",
                    "status": "failed",
                    "count_txns": 4
                },
                {
                    "name_provider": "Moov",
                    "status": "succeeded",
                    "count_txns": 1
                },
                {
                    "name_provider": "Moov",
                    "status": "",
                    "count_txns": 1
                },
                {
                    "name_provider": "Moov",
                    "status": "successful",
                    "count_txns": 135
                },
                {
                    "name_provider": "Moov",
                    "status": "pending",
                    "count_txns": 29
                },
                {
                    "name_provider": "MTN",
                    "status": "pending",
                    "count_txns": 82
                },
                {
                    "name_provider": "MTN",
                    "status": "failed",
                    "count_txns": 8
                },
                {
                    "name_provider": "MTN",
                    "status": "successful",
                    "count_txns": 406
                },
                {
                    "name_provider": "MTN",
                    "status": "succeeded",
                    "count_txns": 4
                }
            ]
        },
        "txns_recents": []
    }
};