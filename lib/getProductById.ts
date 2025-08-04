import { Parse , initParse } from '@/lib/parse';


export const getProductById = async (id : string) => {
     try {
        let query = new Parse.Query('Products');
        const result = await query.get(id);
        return result?.toJSON();
    } catch (err) {
        console.log(err);
    }


  return null
}
