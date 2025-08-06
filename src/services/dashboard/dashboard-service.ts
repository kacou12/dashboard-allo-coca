import { getProviderColor, setDefaultProviderColor, setProviderColor } from '../auth/auth-util'
import type {
  DashboardFiltersPayload,
  DashboardFiltersRequest,
  DefaultFiltersPayload,
} from '../global.type'
import type { DashboardResponse } from './dashboard-alpha-type'
import { fetchFiltersDashboardApi } from './dashboard-api'

const defaultProviderColor = [
  {
    name: 'mtn',
    color: '#ffc403',
  },
  {
    name: 'orange',
    color: '#f58220',
  },
  {
    name: 'moov',
    color: '#005ca8',
  },
  {
    name: 'wave',
    color: '#1dc8ff',
  },


  {
    name: 'out',
    title: "Sorties",
    color: '#F44336',
  },
  {
    name: 'in',
    title: "Entrées",
    color: '#4CAF50',
  },

]

export async function fetchFiltersDashboard(
  payload: DashboardFiltersPayload,
): Promise<DashboardResponse | undefined> {
  try {
    let payloadData = { ...payload }
    let res = await fetchFiltersDashboardApi({
      payload,
    })
    if (res!.data!.sum_collected_txns_group_by_provider == null) {
      res!.data!.sum_collected_txns_group_by_provider = []
    }
    if (res!.data!.sum_transfered_txns_group_by_provider == null) {
      res!.data!.sum_transfered_txns_group_by_provider = []
    }
    if (res!.data!.count_txns_group_by_provider_and_type.collected == null) {
      res!.data!.count_txns_group_by_provider_and_type.collected = []
    }
    if (res!.data!.count_txns_group_by_provider_and_type.transfered == null) {
      res!.data!.count_txns_group_by_provider_and_type.transfered = []
    }
    if (res!.data!.count_txns_group_by_status == null) {
      res!.data!.count_txns_group_by_status = []
    }
    if (res!.data!.count_txns_group_by_type_and_month == null) {
      res!.data!.count_txns_group_by_type_and_month = []
    }

    if (res!.data!.total_amount_gift_cards_group_by_brand == null) {
      res!.data!.total_amount_gift_cards_group_by_brand = []
    }
    if (res!.data!.count_gift_cards_group_by_brand == null) {
      res!.data!.count_gift_cards_group_by_brand = []
    }
    if (res!.data!.txns_recents == null) {
      res!.data!.txns_recents = []
    }

    for (let index = 0; index < res!.data!.sum_collected_txns_group_by_provider.length; index++) {
      const element = res!.data!.sum_collected_txns_group_by_provider[index]
      if (!getProviderColor(element.provider.name.toLowerCase())) {
        const finded = defaultProviderColor.find((el) => {
          if (el.name.toLowerCase() === element.provider.name.toLowerCase()) {
            return el
          }
        })
        if (finded) {
          setDefaultProviderColor(element.provider.name.toLowerCase(), finded.color)
        } else {
          setProviderColor(element.provider.name.toLowerCase())
        }
      }
    }

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
