import axios from 'axios';

const url = 'https://localhost:7091'
//const url = 'http://129.11.85.2:5005'

export const UseCallApi = async (param:any)=>{

    if(param.action==='GetAnalyse') {

        try {
			const listAnalyse = await axios.get(url+'/api/Analyse/GetAnalyseFromEmployee');		
			return listAnalyse.data;
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }

    // if(param.action==='GetEmployee') {

    //     try {
	// 		const listEmployee = await axios.get(url+'/api/Employees/GetAllEmployees');		
	// 		return listEmployee.data;
	// 	} catch (err) {
	// 		// Handle Error Here
	// 		console.error(err);
	// 		return [];
	// 	}        
    // }
    
    
    
    
}

