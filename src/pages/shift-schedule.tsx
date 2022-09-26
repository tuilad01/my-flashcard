import React, { useEffect, useState } from "react";
import { GroupSchema } from "../datastore/schemas/group-schema";
import { v4 as uuidv4 } from 'uuid';
import { Prev } from "react-bootstrap/esm/PageItem";


function ShiftSchedule() {
    const [list, setList] = useState<any[]>([])
    const [groupName, setGroupName] = useState<string>("");
    const [keyGroup, setKeyGroup] = useState<number>(0)
    const groupSchema = new GroupSchema();

    useEffect(() => {
        groupSchema.findAll().then(values => setList(values))
    }, [])

    const onChangeGroupInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setGroupName(value)
    }

    const onSubmit = async () => {
        const group = { id: uuidv4(), name: groupName }
        const result = await groupSchema.add(group)

        if (result) {
            setGroupName("")
            setList(prev => [...prev, result])
        }
    }

    const onRemove = async (key: number) => {
        groupSchema.remove({ key: key }).then(key => {
            console.log("onRemove value=")
            console.log(key)

            if (key) {
                setList(pre => list.filter(item => item.key !== key))
            }
        })
    }

    const onGetGroup = async () => {
        if (+keyGroup) {
            groupSchema.find({ key: keyGroup }).then(value => console.log(value))
        }
    }

    const onChangeKeyGroup = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setKeyGroup(+value)
    }

    const onUpdate = async () => {
        if (+keyGroup && groupName) {
            groupSchema.update({ key: keyGroup }, {name: groupName}).then(obj => {
                console.log("onUpdate value=")
                console.log(obj)

                if (obj) {
                    setList(prev => [...prev.filter(item => item.key !== obj.key), obj])
                }
            })
        }
    }

    const onSendNotify = () => {
        if (!("Notification" in window)) {
            // Check if the browser supports notifications
            alert("This browser does not support desktop notification");
          } else if (Notification.permission === "granted") {
            // Check whether notification permissions have already been granted;
            // if so, create a notification
            const notification = new Notification("Hi there!");
            // …
          } else if (Notification.permission !== "denied") {
            // We need to ask the user for permission
            Notification.requestPermission().then((permission) => {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                const notification = new Notification("Hi there!");
                // …
              }
            });
          }
    }

    const onSendNotifyAtTime = () => {
        
    }

    //groupSchema
    return (
        <div>
            <input type="text" value={groupName} onChange={onChangeGroupInput} />
            <button onClick={onSubmit}>Add</button>
            <hr />
            <input type="number" placeholder="key number" value={keyGroup} onChange={onChangeKeyGroup} />

            <button onClick={onGetGroup}>Get group by key</button>
            <button onClick={onUpdate}>Update</button>

            <button onClick={onSendNotify}>Notify me!</button>
            <button onClick={onSendNotifyAtTime}>Notify on time</button>
            <ul>
                {list.map((item, index) => {
                    return (
                        <li key={`dfjk_${index}`}>{item.name} <button onClick={_ => onRemove(item.key)}>Delete</button></li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ShiftSchedule;