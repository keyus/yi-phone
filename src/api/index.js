import axios from 'axios'
import Yi from '../util/yi'

export const searchPhone = (klist)=>{
    const query = {
        cnt: 1000,
        page_no: 1,
        numcategory: 0,
        dis: 1,
        st: 4,
        lanmu: 0,
        klist,
    }
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.get('/io/5.asp',{params: query});
            let data = res.data.substr(2);
            data = data.split('|');
            data = data.map(it=>{
                const row = it.split(',');
                let sum = 0 ;
                for (let i of  String(row[0])){
                    sum += Number(i);
                }
                const find = Yi.find(it=>it.index === sum);
                return {
                    phone: row[0],
                    total: sum,
                    price: Number(row[3]) + Number(row[4]),
                    text: find ? find.type : '未知',
                    value: find ? find.value : '未知',
                };
            })
            data.sort((a,b)=>{ return a.price > b.price })

            resolve(data);
        }catch (e) {
            reject();
        }
    })
}
