/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.flipper.plugins.uidebugger.model

import com.facebook.flipper.plugins.uidebugger.descriptors.Id

@kotlinx.serialization.Serializable
data class Node(
    val id: Id,
    val name: String,
    val attributes: Map<String, InspectableObject>,
    val bounds: Bounds?,
    val tags: Set<String>,
    val children: List<Id>,
    val activeChild: Id?,
)
