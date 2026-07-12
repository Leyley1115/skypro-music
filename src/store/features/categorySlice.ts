import { BASE_URL } from '../../app/services/constants';
import axios from 'axios';

export async function getCategories(id: string) {
    const serverId = Number(id) + 1;
    const res = await axios.get(`${BASE_URL}/catalog/selection/${serverId}/`);
    const category = res.data.data;

  if (!category) {
    throw new Error('Категория не найдена');
  }

  return { data: category };
}
