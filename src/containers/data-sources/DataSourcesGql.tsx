import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import DataSources from '../../components/data-sources/DataSources';

const GET_DATA_SOURCES_STATE = gql`
    query GetDataSources {
        dataSources @client {
            loading
            sources {
                id
                name
                columns
            }
        }
    }
`;

const GET_SOURCES = gql`
    mutation GetSources {
        getSources @client
    }
`;

const DataSourcesGqlContainer: React.FC = () => {
    const { loading, error, data } = useQuery(GET_DATA_SOURCES_STATE);
    const [getSources] = useMutation(GET_SOURCES);
    const [items, setItems] = useState();
    useEffect(() => {
        const litems = data.dataSources.sources.map((source: any) => ({
            id: source.id,
            text: source.name,
            subItems: source.columns,
        }));
        setItems(litems);
    }, [data.dataSources.sources])
    return <DataSources items={items} 
        isLoading={data.dataSources.loading} 
        getSources={getSources}
        onColumnDblClick={() => {
            console.log('Double click');
        }}/> 
}

export default DataSourcesGqlContainer;
