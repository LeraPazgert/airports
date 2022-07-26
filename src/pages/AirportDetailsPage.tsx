import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { IAirportDetail } from '../models/models';

const AirportDetailsPage = () => {
    const params = useParams<'id'>();
    const [airport, setAirport] = useState<IAirportDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDetailAirport();
    }, [])

    async function fetchDetailAirport() {
        const response = await axios.get<IAirportDetail>(`/airports/${params.id}`);
        setAirport(response.data);
        setLoading(false);
    }
    if (loading) return <p className='text-center'>Loading...</p>
    return (
        <div className="container mx-auto mt-8 p-4 flex justify-center">
            <div>
                <h1 className="font-bold size text-3xl mb-3 text-blue-700">{airport?.name}</h1>
                <p>country: {airport?.country}</p>
                <p>continent: {airport?.continent}</p>
                <p>coordinates: {airport?.coordinates}</p>
                <p>elevation_ft: {airport?.elevation_ft}</p>
                <p>gps_code: {airport?.gps_code}</p>
                <p>iata_code: {airport?.iata_code}</p>
                <p>ident: {airport?.ident}</p>
                <p>local_code: {airport?.local_code}</p>
                <p>municipality: {airport?.municipality}</p>
                <p>region: {airport?.region}</p>
                <p>type: {airport?.type}</p>
            </div>
        </div>

    );
};

export default AirportDetailsPage;