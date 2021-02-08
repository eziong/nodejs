import React, { useState } from "react";
import Info from "./User/Info";
import CRUD from "./CRUD_board/CRUDController";

export default function ManiPage() {
    return (
        <div>
            <Info />
            <CRUD />
        </div>
    );
}
