import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";
import { toast } from "react-toastify";

function WorkoutHistory() {
    const {user} = useContext(AuthContext);
    const [history,setHistory] = useState([]);
    const [filteredHistory,setFilteredHistory] = useState([]);
    const [dateRange,setDateRange] = useState("all");
    const [minDuration,setMinDuration] = useState("");
    const [editLogId,setEditLogId] = useState(null);
    const [updatedDuration,setUpdatedDuration] = useState("");
    const [updatedNotes,setUpdatedNotes] = useState("");

    useEffect(()=>{
        const fetchWorkoutHistory = async () =>{
            try {
                const response = await API.get("/workout-log",{
                    headers:{Authorization: `Bearer ${user}`},
                })
                console.log("Displaying Workout history");
                setHistory(response.data);
                setFilteredHistory(response.data)
            } 
            catch (error) {
                console.error("Error Fetching workout history: ",error);
                toast.error("Failed to fetch Workout History")
            }
        }
        fetchWorkoutHistory();
    },[user]);

    useEffect(()=>{
        if (!Array.isArray(history) || history.length === 0) {
            console.log("Waiting for history data or no logs yet...");
            return;
        }
        let filtered = history;
        //console.log("let filtered is",filtered)
        if(dateRange!=="all"){
            const now = new Date();
            filtered = filtered.filter((log)=>{
                const workoutDate = new Date(log.date);
                if (dateRange==="7days"){
                    return workoutDate >= new Date(now.setDate(now.getDate()-7));
                }
                else if(dateRange==="month"){
                    return workoutDate >= new Date(now.setMonth(now.getMonth()-1));
                }
                else{
                    return true;
                }
            })
        }
        filtered = filtered.filter((log) => {
            return minDuration === "" || log.duration >= Number(minDuration);
        });

        setFilteredHistory(filtered);
    },[dateRange,minDuration,history]);
 
    const handleDelete = async (logId) =>{
        try {
            const response = await API.delete(`/workout-log/delete/${logId}`,{
                headers:{Authorization:`Bearer ${user}`},
            })
            //console.log("token",user)
            if (response.status === 200) {
                setHistory(history.filter(log => log._id !== logId)); 
                //setFilteredHistory(filteredHistory.filter(log => log._id !== logId)); // Remove log from UI
                toast.success("Workout-log deleted succesfully");
              } else {
                console.error("Failed to delete workout log:", response.data.message);
                toast.error("Failed to delete Workout-log")
            }
        }catch (error) {
            console.error("Error deleting workout logs: ",error);
            toast.error("Failed to delete Workout-log")
        }
    }

    const handleUpdate = async (logId) =>{
        try {
            console.log("Updating workout log with ID:",logId); 
            const response = await API.put(`/workout-log/update/${logId}`,
                {duration:updatedDuration,notes:updatedNotes},
                {headers:{Authorization:`Bearer ${user}`}}
            );
            //console.log("Updated Workout Log:", response.data); // Debugging

            setHistory((prevHistory)=>
                prevHistory.map((log)=>
                    log._id === logId
                    ? response.data
                    : log
                )
            );

            toast.success("Workout-log updated successfully");
            setEditLogId(null);
        } catch (error) {
            console.error("Error editing workout logs",error);
            toast.error("Failed to update Workout-log")
        }
    }
    
        
  return (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Workout History</h1>
        <div className="mb-4 flex flex-col md:flex">
            <select value={dateRange} onChange={(e)=> setDateRange(e.target.value)} className="p-2 border rounded">
                <option value="all">All time</option>
                <option value="7days">Past 7 days</option>
                <option value="month">Last month</option>
            </select>
            <input 
            type="number"
            value={minDuration} 
            onChange={(e)=> setMinDuration(e.target.value)} 
            placeholder="Min Duration (in mins)" 
            className="p-2 border rounded"
            />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {filteredHistory.length === 0 ? (
                <p className="text-gray-600">
                    No workouts logged yet.
                </p>):(
                filteredHistory.map((log)=>(
                    <div key={log._id} className="p-4 bg-white shadow-md rounded-lg">

                        <h3 className="text-lg font-bold">{log.workoutId.name}</h3>
                        <p className="text-gray-600">{log.workoutId.description}</p>
                        <p className="text-sm text-gray-500">Completed on : {new Date(log.date).toLocaleDateString()}</p>


                        {editLogId === log._id ?(
                            <div>
                                <input
                                type="number" 
                                name="duration" 
                                value={updatedDuration} 
                                onChange={(e)=> setUpdatedDuration(e.target.value)}
                                placeholder="Duration" 
                                className="border p-2 rounded w-full mb-2"
                                />
                                <input 
                                type="text"
                                name="notes"
                                value={updatedNotes}
                                onChange={(e)=> setUpdatedNotes(e.target.value)}
                                placeholder="Notes" 
                                className="border p-2 rounded w-full mb-2"
                                />
                                <button 
                                onClick={()=> handleUpdate(log._id)}
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Save
                                </button>
                                <button 
                                onClick={()=> setEditLogId(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) :(
                            <div>
                                {log.duration && <p className="text-sm text-gray-600">Duration : {log.duration} min</p>}
                                {log.notes && <p className="text-sm italic text-gray-600">Notes : {log.notes}</p>}
                                <button 
                                onClick={()=>{
                                    
                                    setUpdatedDuration(log.duration);
                                    setUpdatedNotes(log.notes);
                                    setEditLogId(log._id);
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2" >
                                    Edit
                                </button>
                            </div>
                        )}
                        
                        <button onClick={()=>handleDelete(log._id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
                            Delete
                        </button>

                    </div>
                ))
            )}
        </div>
    </div>
  );
};

export default WorkoutHistory;