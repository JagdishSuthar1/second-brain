import { CommandItem, CommandInput, CommandDialog, CommandEmpty, CommandGroup, CommandList } from "../ui/command";
import React, { useContext, useRef, useState } from "react";
import { DashboardContext } from "@/context/dashboard-context";
import { axiosInstance } from "@/axiosInstance";
import { toast } from "sonner";
import { BotIcon, FileIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";

export function SearchQuery() {
    const { searchOpen, setSearchOpen, suggestedContent, setSuggestedContent, setAiSummary } = useContext(DashboardContext)!;
    // const searchRef = useRef<HTMLInputElement>(null);
    const searchTextRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate();



    async function searchForSuggestion() {
        console.log("Search the notes in your Brain....");
        console.log(searchTextRef)
        if (searchTextRef != null && searchTextRef.current != null && searchTextRef.current.value != "") {
            const response = await axiosInstance.post("/api/v1/search/top-suggestion", {
                text: searchTextRef.current.value
            })

            console.log(response.data)
            if (response.data.success == true) {
                console.log(response.data.data)
                setSuggestedContent(response.data.data);
                // searchRef.current.value = "";
                // setSearchText("")
            }
            else {
                toast.error(response.data.message)
            }

        }
        else {
            toast.error("Enter the text first")
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            if (searchOpen == false) setSearchOpen(true);
            console.log("Key is pressed")
            searchForSuggestion();
        }
    }



    async function handleAISummarize() {
        console.log("jjj")
        console.log(suggestedContent);
        
        
        if (searchTextRef != null && searchTextRef.current != null && suggestedContent != null) {
            console.log(searchTextRef);
            const response = await axiosInstance.post("/api/v1/search/ai-summarize", {
                query: searchTextRef.current.value,
                documents: suggestedContent
            })

            console.log(response.data);
            if (response.data.success = true) {
                setAiSummary(response.data.data);
                toast.success(response.data.message);
                setSearchOpen(false)
                navigate("/details")
            }
            else {
                toast.error(response.data.message)
            }
        }
    }

    return (


        <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
            {/* <DialogTitle>Search In </DialogTitle> */}
            <div className="flex flex-row mt-10 mb-3">
            <Input ref={searchTextRef} placeholder="Search in Your Brain" className="mt-2 ml-2"
                onKeyDown={(event) => handleKeyDown(event)}  />

            <div className="mt-2 flex justify-end px-3">
                <Button onClick={handleAISummarize}><BotIcon />AI Summarize</Button>
            </div>
            </div>
            <CommandInput />

            <CommandList className="bg-[#191919] mt-1">
                <CommandEmpty className="text-amber-50 flex flex-row justify-center">No results found</CommandEmpty>
                {suggestedContent && suggestedContent.length > 0 ? <CommandGroup heading="Suggestions" className="flex flex-col gap-2">
                    {/* here i render the last fetched notes */}
                    {suggestedContent.map((item, index) => (
                        <CommandItem className="flex flex-row gap-3 text-amber-50" key={index}>
                            <FileIcon />
                            {item.title}
                        </CommandItem>
                    ))}
                </CommandGroup> :
                    <div>
                        {/* <span className="text-amber-50">N data found</span> */}
                    </div>
                }


            </CommandList>

        </CommandDialog>


    )
}
