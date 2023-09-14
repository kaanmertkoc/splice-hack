import axios from '@/node_modules/axios/index';
import Image from 'next/image';

export default async function Home() {
  const fetchSomething = async () => {
    const baseurl = 'https://surfaces-graphql.splice.com/';

    const token = 'ENTER_YOUR_TOKEN_HERE';
    const axiosObj = axios.create({
      baseURL: baseurl,
      headers: {
        'Content-Type': 'application/json',
        'x-splice-machine-tenant-id': 'public',
        'x-splice-machine-api-key': 'public',
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await axiosObj.post('graphql', {
      operationName: 'SamplesSearch',
      query:
        'query SamplesSearch($asset_status_slug: AssetStatusSlug, $page: Int, $order: SortOrder = DESC, $limit: Int = 50, $sort: AssetSortType = relevance, $parent_asset_uuid: GUID, $parent_asset_type: AssetTypeSlug, $query: String, $tags: [ID!], $tags_exclude: [ID!], $key: String, $chord_type: String, $min_bpm: Int, $max_bpm: Int, $bpm: String, $liked: Boolean, $licensed: Boolean, $filepath: String, $asset_category_slug: AssetCategorySlug, $random_seed: String, $ac_uuid: String) {\n  assetsSearch(\n    filter: {legacy: true, published: true, asset_type_slug: sample, asset_status_slug: $asset_status_slug, asset_category_slug: $asset_category_slug, query: $query, tag_ids: $tags, tag_ids_exclude: $tags_exclude, key: $key, chord_type: $chord_type, min_bpm: $min_bpm, max_bpm: $max_bpm, bpm: $bpm, liked: $liked, licensed: $licensed, filepath: $filepath, ac_uuid: $ac_uuid}\n    children: {parent_asset_uuid: $parent_asset_uuid}\n    pagination: {page: $page, limit: $limit}\n    sort: {sort: $sort, order: $order, random_seed: $random_seed}\n    legacy: {parent_asset_type: $parent_asset_type}\n  ) {\n    ...assetDetails\n    __typename\n  }\n}\n\nfragment assetDetails on AssetPage {\n  ...assetPageItems\n  ...assetTagSummaries\n  ...assetDeviceSummaries\n  pagination_metadata {\n    currentPage\n    totalPages\n    __typename\n  }\n  response_metadata {\n    next\n    previous\n    records\n    __typename\n  }\n  __typename\n}\n\nfragment assetPageItems on AssetPage {\n  items {\n    ... on IAsset {\n      asset_prices {\n        amount\n        currency\n        __typename\n      }\n      uuid\n      name\n      liked\n      licensed\n      asset_type {\n        label\n        __typename\n      }\n      asset_type_slug\n      tags {\n        uuid\n        label\n        taxonomy {\n          uuid\n          name\n          __typename\n        }\n        __typename\n      }\n      files {\n        name\n        hash\n        path\n        asset_file_type_slug\n        url\n        __typename\n      }\n      __typename\n    }\n    ... on IAssetChild {\n      parents(filter: {asset_type_slug: pack}) {\n        items {\n          __typename\n          ... on PackAsset {\n            uuid\n            name\n            permalink_base_url\n            asset_type_slug\n            files {\n              path\n              asset_file_type_slug\n              url\n              __typename\n            }\n            permalink_slug\n            child_asset_counts {\n              type\n              count\n              __typename\n            }\n            main_genre\n            __typename\n          }\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on SampleAsset {\n      uuid\n      name\n      bpm\n      chord_type\n      duration\n      instrument\n      key\n      asset_category_slug\n      has_similar_sounds\n      has_coso\n      __typename\n    }\n    ... on PresetAsset {\n      uuid\n      name\n      device {\n        name\n        uuid\n        plugin_type\n        minimum_device_version\n        __typename\n      }\n      asset_devices {\n        device {\n          name\n          uuid\n          device_type_slug\n          minimum_device_version\n          __typename\n          ... on PluginDevice {\n            plugin_type\n            __typename\n          }\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on PackAsset {\n      uuid\n      name\n      provider {\n        name\n        created_at\n        __typename\n      }\n      provider_uuid\n      uuid\n      permalink_slug\n      permalink_base_url\n      main_genre\n      __typename\n    }\n    ... on ILegacyAsset {\n      catalog_uuid\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment assetTagSummaries on AssetPage {\n  tag_summary {\n    tag {\n      uuid\n      label\n      taxonomy {\n        uuid\n        name\n        __typename\n      }\n      __typename\n    }\n    count\n    __typename\n  }\n  __typename\n}\n\nfragment assetDeviceSummaries on AssetPage {\n  device_summary {\n    device {\n      uuid\n      name\n      __typename\n    }\n    count\n    __typename\n  }\n  __typename\n}\n',
      variables: {
        limit: 40,
        order: 'DESC',
        parent_asset_type: 'collection',
        parent_asset_uuid: '1afdc322-4b6f-4ec1-84e6-98c4d9b8d252',
        sort: 'recency',
        tags: [],
        tags_exclude: [],
      },
    });
    return data;
  };

  const data = await fetchSomething();

  console.log('data', data?.data?.assetsSearch?.items);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {data?.data?.assetsSearch?.items?.map((item: any) => {
        console.log(item?.files[0]?.url);
        return (
          <div className='mb-4'>
            <p>{item?.name}</p>
            <a target={'_blank'} href={`${item?.files[0]?.url}`}>
              Click
            </a>
          </div>
        );
      })}
    </main>
  );
}
