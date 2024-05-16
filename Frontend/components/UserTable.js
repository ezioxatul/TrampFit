import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function UserTable(props) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {
                        props.columnName.map((val) => {
                            return <TableHead className="text-md text-green-600">{val}</TableHead>
                        })
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    props.rowData.map((Info) => {
                        return (
                            <>
                                <TableRow>
                                    {
                                        Info.map((val) => {
                                            return (
                                                val === 'View Detail' ? <TableCell className="text-green-600 hover:text-green-700 cursor-pointer" id={Info} onClick={props.viewDetail}>{val}</TableCell> :
                                                    val === 'Pending' ? <TableCell ><p className=" text-yellow-500 font-semibold">{val}</p></TableCell> :
                                                        val === 'Approved' ? <TableCell><p className="text-green-600 font-semibold">{val}</p></TableCell> :
                                                            val === 'Rejected' ? <TableCell><p className=" text-red-500 font-semibold">{val}</p></TableCell> :
                                                                <TableCell>{val}</TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            </>
                        );
                    })
                }

            </TableBody>
        </Table>
    );
}