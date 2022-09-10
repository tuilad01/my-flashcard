import { Form } from "react-bootstrap"

enum Duty {
    None = 0,
    S1 = 1,
    S2 = 2
}

type ShiftByMonth = {
    month: number
    dates: ShiftByDate[]
}

type ShiftByDate = {
    date: Date
    duty: Duty
}



const getShiftInYear = (dShift: Date): ShiftByMonth[] => {
    const result: ShiftByMonth[] = []
    const year = dShift.getFullYear()

    let arrLastDuty: Duty[] = []

    for (let month = 0; month < 12; month++) {
        // new instance ShiftByMonth to add to array after fill up dates in month
        const objMonth: ShiftByMonth = {
            month: month,
            dates: []
        }
        // get date
        for (let date = 1; date < 32; date++) {
            const thatDate = new Date(year, month, date)
            if (date === thatDate.getDate()) {

                if (thatDate.getDate() === dShift.getDate() && thatDate.getMonth() === dShift.getMonth()) {                    
                    objMonth.dates.push({
                        date: thatDate,
                        duty: Duty.S1
                    })

                    arrLastDuty.push(Duty.S1)
                } else if (thatDate > dShift) {
                    if (thatDate.getDate() !== 6 && thatDate.getDate() !== 0) {
                        arrLastDuty = getThatDateDuty(arrLastDuty)
                        objMonth.dates.push({
                            date: thatDate,
                            duty: arrLastDuty[arrLastDuty.length - 1]
                        })
                    } else {                        
                        objMonth.dates.push({
                            date: thatDate,
                            duty: arrLastDuty[arrLastDuty.length - 1]
                        })
                    }

                } else {
                    objMonth.dates.push({
                        date: thatDate,
                        duty: Duty.None
                    })
                }

            } else {
                break;
            }

        }

        // add a month to array
        result.push(objMonth)

    }
    return result
}

const getThatDateDuty = (arrLastDuty: Duty[]): Duty[] => {
    const arrNextDuty: Duty[] = [...arrLastDuty]
    if (arrLastDuty.length === 1) {
        arrNextDuty.push(Duty.None)
    } else if (arrLastDuty.length === 2) {
        if (arrLastDuty[arrLastDuty.length - 1]) {
            arrNextDuty[0] = arrLastDuty[1]
            arrNextDuty[1] = Duty.None
        } else {
            let nextDuty = Duty.S1
            if (arrLastDuty[0] === 1)
                nextDuty = Duty.S2
            arrNextDuty[0] = arrLastDuty[1]
            arrNextDuty[1] = nextDuty
        }
    }

    return arrNextDuty
}


function ShiftSchedule() {
    const myDateShift = new Date(2022, 6, 4);

    let resultDuty = [Duty.S1]
    for (let i = 0; i < 10; i++) {
        resultDuty = getThatDateDuty(resultDuty);

        //console.log(resultDuty)
        
    }

    const data = getShiftInYear(myDateShift);

    console.log(data);
    return (
        <div>
            {/* {data.map((monthShift, ms_index) => {
                return (
                    <div key={`dsfak_${ms_index}`}>
                        <div>Month: {monthShift.month + 1}</div>
                        <div>
                            {monthShift.dates.map((dateShift, ds_index) => {
                                return (
                                    <span key={`dfeu_${ds_index}`} style={dateShift.duty !== Duty.None ? dateShift.duty === Duty.S1 ? {"backgroundColor": "red"} : {"backgroundColor": "blue"} : {}}> {dateShift.date.getDate()} </span>
                                )
                            })}
                        </div>
                    </div>
                )
            })} */}

            <Form.Group controlId="form-group-id" >
                <Form.Control defaultValue={'2022-09-07'} type="date" placeholder="date picker" style={{"width": "200px"}}/>
            </Form.Group>
        </div>
    );
}

export default ShiftSchedule;