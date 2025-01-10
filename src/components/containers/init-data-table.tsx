import React, {JSX} from 'react'
import {Check, X} from "lucide-react";
import {User} from "@telegram-apps/types";
import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

type DataValue = string | number | boolean | null | undefined

interface InitDataTableProps {
    data: User | undefined
}

function formatValue(value: DataValue): string | JSX.Element {
    if (value === null || value === undefined || value === '') {
        return <Badge variant="secondary">undefined</Badge>
    }
    if (typeof value === 'boolean') {
        return value
            ? <Check className="text-green-500"/>
            : <X className="text-red-500"/>
    }
    if (typeof value === 'object') {
        return JSON.stringify(value)
    }
    return String(value)
}

export function InitDataTable({data}: InitDataTableProps) {
    return (
        <div className="mx-auto w-full max-w-2xl">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/2">Ключ</TableHead>
                        <TableHead className="w-1/2">Значение</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && Object.entries(data).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell className="font-medium">{key}</TableCell>
                            <TableCell>{formatValue(value)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

