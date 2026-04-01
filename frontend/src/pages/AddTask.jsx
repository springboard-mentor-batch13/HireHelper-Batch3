import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

export default function AddTask() {
    const navigate = useNavigate();
    const fileRef = useRef();
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        location: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        picture: null
    });
    
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

 /* -------------------------- HANDLE INPUT --------------------------*/
    const handleInput = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value
        }));
    };

 /* -------------------------- HANDLE IMAGE --------------------------*/
    const handleImage = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Only image files allowed");
            return;
        }
        setTaskData(prev => ({
            ...prev,
            picture: file
        }));
        setPreview(URL.createObjectURL(file));
    };
/* -------------------------- DRAG DROP-------------------------- */
    const handleDrop = (e) => {
        e.preventDefault();
        handleImage(e.dataTransfer.files[0]);
    };
/*--------------------------REMOVE IMAGE --------------------------*/
    const removeImage = () => {
        setPreview(null);
        setTaskData(prev => ({
            ...prev,
            picture: null
        }));
    };

/* -------------------------- SUBMIT TASK -------------------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskData.title.trim()) {
        toast.error("Task title is required");
        return;
    }
        if (loading) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", taskData.title);
            formData.append("description", taskData.description);
            formData.append("location", taskData.location);
            formData.append(
                "start_time",
                `${taskData.startDate}T${taskData.startTime}`
            );
            if (taskData.endDate && taskData.endTime) {
                formData.append("end_time",
                    `${taskData.endDate}T${taskData.endTime}`
                );
            }

            if (taskData.picture) {
                formData.append("picture", taskData.picture);
            }
            await API.post(
                "/tasks/create",
                formData
            );
            toast.success("Task created successfully");
            setTaskData({
                title: "",
                description: "",
                location: "",
                startDate: "",
                startTime: "",
                endDate: "",
                endTime: "",
                picture: null
            });
            setPreview(null);
            navigate("/dashboard/my-tasks");
        }
        catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||"Failed to create task");
        }
        finally {
            setLoading(false);
        }
    };

/* -------------------------- UI --------------------------*/
return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
                Create Task
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <input
            type="text"
            name="title"
            placeholder="Task title"
            value={taskData.title}
            onChange={handleInput}
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required/>
            
            <textarea
            name="description"
            placeholder="Description"
            value={taskData.description}
            onChange={handleInput}
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            rows="4"
            required/>
            
            <input
            type="text"
            name="location"
            placeholder="Location"
            value={taskData.location}
            onChange={handleInput}
            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required/>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="text-xs sm:text-sm text-gray-600">Start Date</label>
                    <input
                    type="date"
                    name="startDate"
                    value={taskData.startDate}
                    onChange={handleInput}
                    className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required/>
                </div>
                <div>
                    <label className="text-xs sm:text-sm text-gray-600">Start Time</label>
                    <input
                    type="time"
                    name="startTime"
                    value={taskData.startTime}
                    onChange={handleInput}
                    className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required/>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="text-xs sm:text-sm text-gray-600">End Date</label>
                    <input
                    type="date"
                    name="endDate"
                    value={taskData.endDate}
                    onChange={handleInput}
                    className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs sm:text-sm text-gray-600">End Time</label>
                    <input
                    type="time"
                    name="endTime"
                    value={taskData.endTime}
                    onChange={handleInput}
                    className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            {/* upload */}
            <div 
            onClick={() => fileRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-blue-400 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition">
                <p className="text-sm sm:text-base text-gray-600">
                    {preview ? "Change image" : "Click or drag image"}
                </p>
                <input
                type="file"
                hidden
                ref={fileRef}
                onChange={(e) => handleImage(e.target.files[0])}/>
            </div>

            {/* preview */}
            {preview && (
                <div className="text-center">
                    <img
                    src={preview}
                    className="h-32 sm:h-48 mx-auto rounded-lg"
                    alt="preview"/>
                    <button 
                    type="button"
                    onClick={removeImage}
                    className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                        Remove Image
                    </button>
                </div>
            )}

            <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition text-sm sm:text-base">
                {loading ? "Creating..." : "Create Task"}
            </button>
            </form>
        </div>
    </div>
);
}