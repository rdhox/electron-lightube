import React, {useEffect} from 'react';
import { getResultGlobalSearch } from "../services/apiService";
 
const MainLayout : React.SFC = () => {

  useEffect(() => {
    async function req() {
      const res = await getResultGlobalSearch('q=Saez');
      console.log(res);
    }
    req();
  });

  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}
 
export default MainLayout ;