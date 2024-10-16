import HeaderBar from '../../components/HeaderBar'
import BuildCard from '@/components/BuildCards';
import React, { useState, useEffect } from 'react';

interface Build {
    name: string;
    address: string;
  }

export default function build() {
    return (
        <main>
            <HeaderBar />
            <BuildCard />

        </main>
    )
}