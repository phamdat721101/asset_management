import axios from "axios";
const ASSET_API_URL = "http://localhost:3002/api/assets";
class AssetDataService {
  getAllAssets() {
    return axios.get(`${ASSET_API_URL}`);
  }
  deleteAsset(assetId) {
    return axios.delete(`${ASSET_API_URL}/${assetId}`);
  }
  updateAsset(asset) {
    return axios.put(`${ASSET_API_URL}`, asset);
  }
  getAssetById(assetId) {
    return axios.get(`${ASSET_API_URL}/${assetId}`);
  }

  addAsset(asset) {
    return axios.post(`${ASSET_API_URL}`, asset);
  }
}
export default new AssetDataService();
